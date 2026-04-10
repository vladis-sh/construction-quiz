import { Module } from '@nestjs/common';
import { CatsController } from './projects.controller';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [],
})
export class ProjectsModule {}
