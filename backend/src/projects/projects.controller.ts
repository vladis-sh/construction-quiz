import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class CatsController {
  @Get()
  findAll() {
    return 'This action returns all projects';
  }
}
