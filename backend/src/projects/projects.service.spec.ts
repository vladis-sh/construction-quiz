import { Test } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockPrisma = {
  project: {
    findMany: jest.fn<any>(),
    findUnique: jest.fn<any>(),
    create: jest.fn<any>(),
    update: jest.fn<any>(),
    delete: jest.fn<any>(),
  },
};

const FULL_INCLUDE = {
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
};

describe('ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    projectsService = module.get(ProjectsService);
    jest.clearAllMocks();
  });

  //getProjects

  describe('getProjects', () => {
    it('returns all projects with their relations', async () => {
      const projects = [
        {
          id: 1,
          name: 'House',
          projectImages: [],
          projectFloors: [],
          projectOpenings: [],
        },
      ];
      mockPrisma.project.findMany.mockResolvedValue(projects);

      expect(await projectsService.getProjects()).toEqual(projects);
    });

    it('throws InternalServerErrorException on db error', async () => {
      mockPrisma.project.findMany.mockRejectedValue(
        new Error('connection lost'),
      );

      await expect(projectsService.getProjects()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // getProjectById

  describe('getProjectById', () => {
    it('returns project when found', async () => {
      const project = { id: 1, name: 'House' };
      mockPrisma.project.findUnique.mockResolvedValue(project);

      const result = await projectsService.getProjectById(1);

      expect(result).toEqual(project);
      expect(mockPrisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: FULL_INCLUDE,
      });
    });

    it('throws NotFoundException when project doesnt exist', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);

      await expect(projectsService.getProjectById(99)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws InternalServerErrorException on db error', async () => {
      mockPrisma.project.findUnique.mockRejectedValue(new Error('timeout'));

      await expect(projectsService.getProjectById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // createProject

  describe('createProject', () => {
    it('creates and returns new project', async () => {
      const dto = { name: 'Cottage', slug: 'cottage', base_price: 5_000_000 };
      const created = { id: 1, ...dto };
      mockPrisma.project.create.mockResolvedValue(created);

      const result = await projectsService.createProject(dto);

      expect(result).toEqual(created);
      expect(mockPrisma.project.create).toHaveBeenCalledWith({ data: dto });
    });

    it('throws InternalServerErrorException on db error', async () => {
      mockPrisma.project.create.mockRejectedValue(new Error('Database Error'));

      await expect(
        projectsService.createProject({ name: 'X', slug: 'x', base_price: 0 }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  // ── updateProject ─────────────────────────────────────────────────────────────

  describe('updateProject', () => {
    it('updates and returns the project', async () => {
      const existing = {
        id: 1,
        name: 'Old House',
        slug: 'old',
        base_price: 1_000_000,
      };
      const updated = { ...existing, name: 'New House' };
      mockPrisma.project.findUnique.mockResolvedValue(existing);
      mockPrisma.project.update.mockResolvedValue(updated);

      const result = await projectsService.updateProject(1, {
        name: 'New House',
      });

      expect(result).toEqual(updated);
      expect(mockPrisma.project.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'New' },
      });
    });

    it('throws NotFoundException when project doesnt exist', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);

      await expect(
        projectsService.updateProject(99, { name: 'X' }),
      ).rejects.toThrow(NotFoundException);
      expect(mockPrisma.project.update).not.toHaveBeenCalled();
    });

    it('throws InternalServerErrorException on database error during update', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.project.update.mockRejectedValue(new Error('db error'));

      await expect(
        projectsService.updateProject(1, { name: 'X' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  // ── deleteProject

  describe('deleteProject', () => {
    it('deletes and returns project', async () => {
      const project = { id: 1, name: 'must be deleted' };
      mockPrisma.project.findUnique.mockResolvedValue(project);
      mockPrisma.project.delete.mockResolvedValue(project);

      const result = await projectsService.deleteProject(1);

      expect(result).toEqual(project);
      expect(mockPrisma.project.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('throws NotFoundException when project doesnt exist', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);

      await expect(projectsService.deleteProject(99)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrisma.project.delete).not.toHaveBeenCalled();
    });

    it('throws InternalServerErrorException on db error during delete', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.project.delete.mockRejectedValue(new Error('fk constraint'));

      await expect(projectsService.deleteProject(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
