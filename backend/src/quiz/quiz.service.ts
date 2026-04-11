import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveAnswersDto } from './dto/save-answers.dto';

//
@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz() {
    await this.prisma.quiz.create({ data: {} });
    return { message: 'Quiz created successfully' }; // todo: fix
  }
  async saveAnswers(quizId: number, dto: SaveAnswersDto) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    await this.prisma.quizAnswer.deleteMany({ where: { quizId } });

    // Создаем ответы
    await this.prisma.quizAnswer.createMany({
      data: dto.answers.map((answer) => ({
        quizId,
        questionId: answer.questionId,
        optionId: answer.optionId,
      })),
    });
    return { message: 'Answers saved successfully' }; // todo: fix

    // Process the answers and save them
  }
  async computeMatches(quizId: number) {}
}
