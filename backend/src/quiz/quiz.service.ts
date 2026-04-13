import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveAnswersDto } from './dto/save-answers.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getQuestions() {
    return this.prisma.quizQuestion.findMany({
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async createQuiz() {
    const quiz = await this.prisma.quiz.create({ data: {} });
    return { id: quiz.id };
  }

  async saveAnswers(quizId: number, dto: SaveAnswersDto) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    await this.prisma.quizAnswer.deleteMany({ where: { quizId } });
    await this.prisma.quizAnswer.createMany({
      data: dto.answers.map((answer) => ({
        quizId,
        questionId: answer.questionId,
        optionId: answer.optionId,
      })),
    });
    return { message: 'Answers saved successfully' };
  }

  //TODO:
  async computeMatches(quizId: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        answers: {
          include: {
            question: true,
            option: true,
          },
        },
      },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const answerMap: Record<string, string> = {};
    for (const answer of quiz.answers) {
      answerMap[answer.question.key] = answer.option.value;
    }

    const projects = await this.prisma.project.findMany({
      include: {
        projectImages: { take: 1 },
        projectRoofs: { take: 1 },
      },
    });

    const scored = projects.map((project) => {
      let totalScore = 0;
      let criteriaCount = 0;

      // Budget scoring
      const budgetAnswer = answerMap['budget'];
      if (budgetAnswer) {
        criteriaCount++;
        const price = project.base_price;
        let s = 0;
        if (budgetAnswer === 'budget_low') {
          s =
            price <= 8_000_000
              ? 100
              : Math.max(0, 100 - ((price - 8_000_000) / 2_000_000) * 50);
        } else if (budgetAnswer === 'budget_medium') {
          s =
            price > 8_000_000 && price <= 12_000_000
              ? 100
              : price <= 8_000_000
                ? Math.max(0, 70 - ((8_000_000 - price) / 2_000_000) * 40)
                : Math.max(0, 70 - ((price - 12_000_000) / 2_000_000) * 40);
        } else if (budgetAnswer === 'budget_high') {
          s =
            price > 12_000_000 && price <= 18_000_000
              ? 100
              : price <= 12_000_000
                ? Math.max(0, 70 - ((12_000_000 - price) / 3_000_000) * 40)
                : Math.max(0, 70 - ((price - 18_000_000) / 3_000_000) * 40);
        } else if (budgetAnswer === 'budget_premium') {
          s =
            price > 18_000_000
              ? 100
              : Math.max(0, 100 - ((18_000_000 - price) / 5_000_000) * 50);
        }
        totalScore += s;
      }

      // Area scoring
      const areaAnswer = answerMap['area'];
      if (areaAnswer) {
        criteriaCount++;
        const area = project.area;
        let s = 0;
        if (areaAnswer === 'area_small') {
          s = area <= 80 ? 100 : Math.max(0, 100 - ((area - 80) / 20) * 50);
        } else if (areaAnswer === 'area_medium') {
          s =
            area > 80 && area <= 120
              ? 100
              : area <= 80
                ? Math.max(0, 70 - ((80 - area) / 20) * 40)
                : Math.max(0, 70 - ((area - 120) / 20) * 40);
        } else if (areaAnswer === 'area_large') {
          s =
            area > 120 && area <= 160
              ? 100
              : area <= 120
                ? Math.max(0, 70 - ((120 - area) / 20) * 40)
                : Math.max(0, 70 - ((area - 160) / 20) * 40);
        } else if (areaAnswer === 'area_xlarge') {
          s = area > 160 ? 100 : Math.max(0, 100 - ((160 - area) / 40) * 50);
        }
        totalScore += s;
      }

      // Roof scoring
      const roofAnswer = answerMap['roof'];
      if (roofAnswer && project.projectRoofs.length > 0) {
        criteriaCount++;
        const roofType = project.projectRoofs[0].roofType.toLowerCase();
        let s = 40; // default partial match
        if (roofAnswer === 'roof_any') {
          s = 100;
        } else if (
          roofAnswer === 'roof_gable' &&
          (roofType.includes('двускат') || roofType.includes('двухскат'))
        ) {
          s = 100;
        } else if (
          roofAnswer === 'roof_hip' &&
          (roofType.includes('вальм') || roofType.includes('четырехскат'))
        ) {
          s = 100;
        } else if (roofAnswer === 'roof_flat' && roofType.includes('плоск')) {
          s = 100;
        }
        totalScore += s;
      }

      const avgScore =
        criteriaCount > 0 ? Math.round(totalScore / criteriaCount) : 50;

      return { project, score: avgScore };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 5);

    await this.prisma.quizProjectMatch.deleteMany({ where: { quizId } });
    await this.prisma.quizProjectMatch.createMany({
      data: topMatches.map(({ project, score }) => ({
        quizId,
        projectId: project.id,
        score,
      })),
    });

    return topMatches.slice(0, 3).map(({ project, score }) => ({
      id: project.id,
      name: project.name,
      area: project.area,
      base_price: project.base_price,
      image: project.projectImages[0]?.imageUrl ?? null,
      score,
    }));
  }
}
