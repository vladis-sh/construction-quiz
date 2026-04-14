import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma/prisma.service';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockPrisma = {
  quizQuestion: { findMany: jest.fn() },
  quiz: { create: jest.fn(), findUnique: jest.fn() },
  quizAnswer: { deleteMany: jest.fn(), createMany: jest.fn() },
  quizProjectMatch: { deleteMany: jest.fn(), createMany: jest.fn() },
  project: { findMany: jest.fn() },
} as any;

function makeQuizWithAnswers(answers: { key: string; value: string }[]) {
  return {
    id: 1,
    answers: answers.map(({ key, value }) => ({
      question: { key },
      option: { value },
    })),
  };
}

function makeProject(
  overrides: Partial<{
    id: number;
    name: string;
    area: number;
    base_price: number;
    roofType: string | null;
  }> = {},
) {
  const {
    id = 1,
    name = 'Test',
    area = 100,
    base_price = 5_000_000,
    roofType = null,
  } = overrides;
  return {
    id,
    name,
    area,
    base_price,
    projectImages: [],
    projectRoofs: roofType ? [{ roofType }] : [],
  };
}

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuizService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(QuizService);
    jest.clearAllMocks();
  });

  // ── getQuestions ─────────────────────────────────────────────────────────────

  describe('getQuestions', () => {
    it('returns questions ordered by id with options ordered by order', async () => {
      const questions = [{ id: 1, options: [{ id: 1, order: 1 }] }];
      mockPrisma.quizQuestion.findMany.mockResolvedValue(questions);

      const result = await service.getQuestions();

      expect(result).toEqual(questions);
      expect(mockPrisma.quizQuestion.findMany).toHaveBeenCalledWith({
        include: { options: { orderBy: { order: 'asc' } } },
        orderBy: { id: 'asc' },
      });
    });
  });

  // ── createQuiz ────────────────────────────────────────────────────────────────

  describe('createQuiz', () => {
    it('creates a quiz record and returns its id', async () => {
      mockPrisma.quiz.create.mockResolvedValue({ id: 42 });

      const result = await service.createQuiz();

      expect(result).toEqual({ id: 42 });
      expect(mockPrisma.quiz.create).toHaveBeenCalledWith({ data: {} });
    });
  });

  // ── saveAnswers ───────────────────────────────────────────────────────────────

  describe('saveAnswers', () => {
    it('throws NotFoundException when quiz does not exist', async () => {
      mockPrisma.quiz.findUnique.mockResolvedValue(null);

      await expect(service.saveAnswers(99, { answers: [] })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deletes old answers then saves new ones', async () => {
      mockPrisma.quiz.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.quizAnswer.deleteMany.mockResolvedValue({});
      mockPrisma.quizAnswer.createMany.mockResolvedValue({});

      const result = await service.saveAnswers(1, {
        answers: [{ questionId: 2, optionId: 3 }],
      });

      expect(mockPrisma.quizAnswer.deleteMany).toHaveBeenCalledWith({
        where: { quizId: 1 },
      });
      expect(mockPrisma.quizAnswer.createMany).toHaveBeenCalledWith({
        data: [{ quizId: 1, questionId: 2, optionId: 3 }],
      });
      expect(result).toEqual({ message: 'Answers saved successfully' });
    });

    it('saves an empty answers array without error', async () => {
      mockPrisma.quiz.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.quizAnswer.deleteMany.mockResolvedValue({});
      mockPrisma.quizAnswer.createMany.mockResolvedValue({});

      const result = await service.saveAnswers(1, { answers: [] });

      expect(mockPrisma.quizAnswer.createMany).toHaveBeenCalledWith({
        data: [],
      });
      expect(result).toEqual({ message: 'Answers saved successfully' });
    });
  });

  // ── computeMatches ────────────────────────────────────────────────────────────

  describe('computeMatches', () => {
    beforeEach(() => {
      mockPrisma.quizProjectMatch.deleteMany.mockResolvedValue({});
      mockPrisma.quizProjectMatch.createMany.mockResolvedValue({});
    });

    it('throws NotFoundException when quiz does not exist', async () => {
      mockPrisma.quiz.findUnique.mockResolvedValue(null);

      await expect(service.computeMatches(99)).rejects.toThrow(
        NotFoundException,
      );
    });

    // ── budget scoring ──────────────────────────────────────────────────────────

    describe('budget scoring', () => {
      it('budget_low scores 100 for price <= 8M', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_low' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ base_price: 7_000_000 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('budget_low scores 50 for price = 10M (1 step above threshold)', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_low' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ base_price: 10_000_000 }),
        ]);

        // 100 - ((10M - 8M) / 2M) * 50 = 50
        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(50);
      });

      it('budget_low scores 0 for price far above 8M', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_low' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ base_price: 20_000_000 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(0);
      });

      it('budget_medium scores 100 for price in (8M, 12M]', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_medium' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ base_price: 10_000_000 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('budget_premium scores 100 for price > 18M', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_premium' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ base_price: 20_000_000 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });
    });

    // ── area scoring ────────────────────────────────────────────────────────────

    describe('area scoring', () => {
      it('area_small scores 100 for area <= 80', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'area', value: 'area_small' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ area: 70 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('area_small penalises area > 80', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'area', value: 'area_small' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ area: 100 }),
        ]);

        // 100 - ((100-80)/20)*50 = 100 - 50 = 50
        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(50);
      });

      it('area_xlarge scores 100 for area > 160', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'area', value: 'area_xlarge' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ area: 200 }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });
    });

    // ── roof scoring ────────────────────────────────────────────────────────────

    describe('roof scoring', () => {
      it('roof_any scores 100 for any roof type', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_any' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ roofType: 'Вальмовая' }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('roof_gable scores 100 for двускатная roof', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_gable' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ roofType: 'Двускатная' }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('roof_gable scores 40 (partial) for non-matching roof type', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_gable' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ roofType: 'Вальмовая' }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(40);
      });

      it('roof_hip scores 100 for вальмовая roof', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_hip' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ roofType: 'Вальмовая' }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('roof_flat scores 100 for плоская roof', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_flat' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ roofType: 'Плоская' }),
        ]);

        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(100);
      });

      it('ignores roof criterion when project has no roof records', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'roof', value: 'roof_gable' }]),
        );
        // roofType: null → projectRoofs: []
        mockPrisma.project.findMany.mockResolvedValue([makeProject()]);

        // criteriaCount = 0 → avgScore falls back to 50
        const [match] = await service.computeMatches(1);
        expect(match.score).toBe(50);
      });
    });

    // ── result shape & ordering ─────────────────────────────────────────────────

    describe('result shape and ordering', () => {
      it('returns at most 3 matches sorted by score descending', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_low' }]),
        );
        // 4 projects — scores: 100, 75, 25, 0
        mockPrisma.project.findMany.mockResolvedValue([
          makeProject({ id: 1, name: 'Cheap', base_price: 5_000_000 }), // 100
          makeProject({ id: 2, name: 'Medium', base_price: 9_000_000 }), // 75
          makeProject({ id: 3, name: 'MedHigh', base_price: 11_000_000 }), // 25
          makeProject({ id: 4, name: 'Pricey', base_price: 20_000_000 }), // 0
        ]);

        const result = await service.computeMatches(1);

        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Cheap');
        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
        }
      });

      it('each result contains id, name, area, base_price, image, score', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(makeQuizWithAnswers([]));
        mockPrisma.project.findMany.mockResolvedValue([
          {
            ...makeProject({
              id: 7,
              name: 'Alpha',
              area: 90,
              base_price: 6_000_000,
            }),
            projectImages: [{ imageUrl: 'img.jpg' }],
          },
        ]);

        const [match] = await service.computeMatches(1);

        expect(match).toMatchObject({
          id: 7,
          name: 'Alpha',
          area: 90,
          base_price: 6_000_000,
          image: 'img.jpg',
        });
        expect(typeof match.score).toBe('number');
      });

      it('image is null when project has no images', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(makeQuizWithAnswers([]));
        mockPrisma.project.findMany.mockResolvedValue([makeProject()]);

        const [match] = await service.computeMatches(1);

        expect(match.image).toBeNull();
      });

      it('persists top 5 matches to quizProjectMatch', async () => {
        mockPrisma.quiz.findUnique.mockResolvedValue(
          makeQuizWithAnswers([{ key: 'budget', value: 'budget_low' }]),
        );
        mockPrisma.project.findMany.mockResolvedValue(
          Array.from({ length: 6 }, (_, i) =>
            makeProject({
              id: i + 1,
              name: `P${i}`,
              base_price: (i + 1) * 1_000_000,
            }),
          ),
        );

        await service.computeMatches(1);

        const createManyCall =
          mockPrisma.quizProjectMatch.createMany.mock.calls[0][0];
        expect(createManyCall.data).toHaveLength(5);
      });
    });
  });
});
