import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { FullProject } from '../pdf/pdf.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getProjects() {
    try {
      return await this.prisma.project.findMany({
        include: {
          projectImages: true,
          projectFloors: true,
          projectOpenings: true,
        },
      });
    } catch {
      throw new InternalServerErrorException(
        'Не удалось получить список проектов',
      );
    }
  }

  async getProjectById(id: number) {
    let project: FullProject | null;
    try {
      project = await this.prisma.project.findUnique({
        where: { id },
        include: {
          projectImages: true,
          projectFoundations: true,
          projectWalls: true,
          projectFloors: true,
          projectRoofs: true,
          projectFacades: true,
          projectOpenings: true,
          projectElectricalSystems: true,
          projectHeatingSystems: true,
          projectWaterSupplySystems: true,
          projectSewerSystems: true,
          projectBoilerRooms: true,
          projectInteriors: true,
          projectExternalNetworks: true,
        },
      });
    } catch {
      throw new InternalServerErrorException('Не удалось получить проект');
    }

    if (!project) {
      throw new NotFoundException(`Проект с id ${id} не найден`);
    }

    return project;
  }

  async createProject(dto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({ data: dto });
    } catch {
      throw new InternalServerErrorException('Не удалось создать проект');
    }
  }

  async updateProject(id: number, dto: UpdateProjectDto) {
    await this.getProjectById(id);
    try {
      return await this.prisma.project.update({ where: { id }, data: dto });
    } catch {
      throw new InternalServerErrorException('Не удалось обновить проект');
    }
  }

  async deleteProject(id: number) {
    await this.getProjectById(id);
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch {
      throw new InternalServerErrorException('Не удалось удалить проект');
    }
  }
}
