import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SaveAnswersDto } from './dto/save-answers.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  createQuiz() {
    return this.quizService.createQuiz();
  }

  @Post(':id/answers')
  saveAnswers(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveAnswersDto,
  ) {
    return this.quizService.saveAnswers(id, dto);
  }

  @Post(':id/matches')
  computeMatches(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.computeMatches(id);
  }

  //   @Get(':id/matches')
  //   getMatches(@Param('id', ParseIntPipe) id: number) {
  //     return this.quizService.getMatches(id);
  //   }
}
