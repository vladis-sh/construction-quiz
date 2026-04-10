import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getProjects(): string[] {
    return ['project1', 'project2', 'project3'];
  }
}
