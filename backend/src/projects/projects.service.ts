import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async getProjects() {
    return await this.prisma.project.findMany();
  }
  async getProjectById(id: number) {
    return await this.prisma.project.findUnique({
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
  }

  async createProject(dto: CreateProjectDto) {
    return await this.prisma.project.create({ data: dto });
  }

  async updateProject(id: number, dto: UpdateProjectDto) {
    return await this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async deleteProject(id: number) {
    return await this.prisma.project.delete({ where: { id } });
  }
}
