import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProjectsModule, PrismaModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
