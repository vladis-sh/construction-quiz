import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedData, additionalProjectsData } from './seed-data/data';

const adapter: PrismaPg = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.quizAnswer.deleteMany();
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.project.deleteMany({ where: { slug: seedData.project.slug } });

  const project = await prisma.project.create({
    data: {
      name: seedData.project.name,
      slug: seedData.project.slug,
      base_price: Math.round(seedData.project.basePrice),
      area: seedData.project.area,

      projectImages: {
        createMany: {
          data: seedData.images.map((img) => ({
            imageUrl: img.imageUrl,
          })),
        },
      },

      projectFoundations: {
        create: {
          preparation_description: seedData.foundation.preparationDescription,
          foundation_type: seedData.foundation.foundationType,
          thickness_mm: seedData.foundation.thicknessMm,
          description: '',
        },
      },

      projectWalls: {
        createMany: {
          data: seedData.walls.map((wall) => ({
            wallType: wall.wallType,
            material: wall.material,
            density: wall.density,
            strengthClass: wall.strengthClass,
            blockLengthMm: wall.blockLengthMm,
            blockHeightMm: wall.blockHeightMm,
            blockThicknessMm: wall.blockThicknessMm,
            description: wall.description,
          })),
        },
      },

      projectFloors: {
        createMany: {
          data: seedData.floors.map((floor) => ({
            floorName: floor.floorName,
            structureType: floor.structureType,
            insulationMaterial: floor.insulationMaterial,
            insulationThicknessMm: floor.insulationThicknessMm,
            description: floor.description,
          })),
        },
      },

      projectRoofs: {
        create: {
          roofType: seedData.roof.roofType,
          finishMaterial: seedData.roof.finishMaterial,
          description: seedData.roof.description,
        },
      },

      projectFacades: {
        create: {
          facadeName: seedData.facade.facadeName,
          insulationMaterial: seedData.facade.insulationMaterial,
          insulationThicknessMm: seedData.facade.insulationThicknessMm,
          description: seedData.facade.description,
        },
      },

      projectOpenings: {
        createMany: {
          data: seedData.openings.map((opening) => ({
            openingType: opening.openingType,
            zoneName: opening.zoneName,
            profile: opening.profile,
            profileWidthMm: opening.profileWidthMm ?? 0,
            widthMm: opening.widthMm ?? 0,
            heightMm: opening.heightMm ?? 0,
            coating: opening.coating ?? '',
            description: opening.description,
          })),
        },
      },

      projectElectricalSystems: {
        create: {
          description: seedData.electrical.description,
          commitDescription: seedData.electrical.commissioningDescription,
        },
      },

      projectHeatingSystems: {
        create: {
          systemType: seedData.heating.systemType,
          baseInsulationMaterial: seedData.heating.baseInsulationMaterial,
          baseInsulationThicknessMm: seedData.heating.baseInsulationThicknessMm,
          fillingDescription: seedData.heating.fillingDescription,
          description: seedData.heating.description,
          commitDescription: seedData.heating.commitDescription,
        },
      },

      projectWaterSupplySystems: {
        create: {
          systemType: seedData.waterSupply.systemType,
          description: seedData.waterSupply.description,
        },
      },

      projectSewerSystems: {
        createMany: {
          data: seedData.sewerSystems.map((sewer) => ({
            description: sewer.description,
          })),
        },
      },

      projectBoilerRooms: {
        create: {
          boilerType: seedData.boilerRoom.boilerType,
          equipmentDescription: seedData.boilerRoom.equipmentDescription,
          customerEquipmentDescription:
            seedData.boilerRoom.customerEquipmentNote,
          description: '',
        },
      },

      projectInteriors: {
        create: {
          description: seedData.interiorFinish.description,
        },
      },

      projectExternalNetworks: {
        create: {
          waterSource: seedData.externalNetworks.waterSource,
          sewer: seedData.externalNetworks.sewer,
          landscaping: seedData.externalNetworks.landscaping,
          description: '',
        },
      },
    },
  });

  const { name, id } = project as { name: string; id: number };
  console.log(`Создан проект: ${name} (id: ${id})`);

  for (const p of additionalProjectsData) {
    await prisma.project.deleteMany({ where: { slug: p.project.slug } });

    const created = await prisma.project.create({
      data: {
        name: p.project.name,
        slug: p.project.slug,
        base_price: p.project.base_price,
        area: p.project.area,

        projectImages: {
          createMany: {
            data: p.images.map((img) => ({ imageUrl: img.imageUrl })),
          },
        },

        projectFoundations: {
          create: {
            preparation_description: p.foundation.preparationDescription,
            foundation_type: p.foundation.foundationType,
            thickness_mm: p.foundation.thicknessMm,
            description: '',
          },
        },

        projectWalls: {
          createMany: {
            data: p.walls.map((w) => ({
              wallType: w.wallType,
              material: w.material,
              density: w.density,
              strengthClass: w.strengthClass,
              blockLengthMm: w.blockLengthMm,
              blockHeightMm: w.blockHeightMm,
              blockThicknessMm: w.blockThicknessMm,
              description: w.description,
            })),
          },
        },

        projectFloors: {
          createMany: {
            data: p.floors.map((f) => ({
              floorName: f.floorName,
              structureType: f.structureType,
              insulationMaterial: f.insulationMaterial,
              insulationThicknessMm: f.insulationThicknessMm,
              description: f.description,
            })),
          },
        },

        projectRoofs: {
          create: {
            roofType: p.roof.roofType,
            finishMaterial: p.roof.finishMaterial,
            description: p.roof.description,
          },
        },

        projectFacades: {
          create: {
            facadeName: p.facade.facadeName,
            insulationMaterial: p.facade.insulationMaterial,
            insulationThicknessMm: p.facade.insulationThicknessMm,
            description: p.facade.description,
          },
        },

        projectOpenings: {
          createMany: {
            data: p.openings.map((o) => ({
              openingType: o.openingType,
              zoneName: o.zoneName,
              profile: o.profile,
              profileWidthMm: o.profileWidthMm ?? 0,
              widthMm: o.widthMm ?? 0,
              heightMm: o.heightMm ?? 0,
              coating: o.coating ?? '',
              description: o.description,
            })),
          },
        },

        projectElectricalSystems: {
          create: {
            description: p.electrical.description,
            commitDescription: p.electrical.commissioningDescription,
          },
        },

        projectHeatingSystems: {
          create: {
            systemType: p.heating.systemType,
            baseInsulationMaterial: p.heating.baseInsulationMaterial,
            baseInsulationThicknessMm: p.heating.baseInsulationThicknessMm,
            fillingDescription: p.heating.fillingDescription,
            description: p.heating.description,
            commitDescription: p.heating.commitDescription,
          },
        },

        projectWaterSupplySystems: {
          create: {
            systemType: p.waterSupply.systemType,
            description: p.waterSupply.description,
          },
        },

        projectSewerSystems: {
          createMany: {
            data: p.sewerSystems.map((s) => ({ description: s.description })),
          },
        },

        projectBoilerRooms: {
          create: {
            boilerType: p.boilerRoom.boilerType,
            equipmentDescription: p.boilerRoom.equipmentDescription,
            customerEquipmentDescription: p.boilerRoom.customerEquipmentNote,
            description: '',
          },
        },

        projectInteriors: {
          create: { description: p.interiorFinish.description },
        },

        projectExternalNetworks: {
          create: {
            waterSource: p.externalNetworks.waterSource,
            sewer: p.externalNetworks.sewer,
            landscaping: p.externalNetworks.landscaping,
            description: '',
          },
        },
      },
    });

    console.log(`Создан проект: ${created.name} (id: ${created.id})`);
  }

  for (const question of seedData.quizQuestions) {
    await prisma.quizQuestion.create({
      data: {
        title: question.title,
        key: question.key,
        options: {
          createMany: {
            data: question.options.map((opt) => ({
              label: opt.label,
              value: opt.value,
              order: opt.order,
            })),
          },
        },
      },
    });
  }
}

seed()
  .catch((error) => {
    console.error('Ошибка при создании seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
