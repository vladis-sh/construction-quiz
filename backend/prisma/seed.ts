import 'dotenv/config';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedData } from './seed-data/data';

const adapter: PrismaPg = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma: PrismaClient = new PrismaClient({ adapter });

async function seed() {
  const project = await prisma.project.create({
    data: {
      name: seedData.project.name,
      slug: seedData.project.slug,
      base_price: Math.round(seedData.project.basePrice),

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
}

seed()
  .catch((error) => {
    console.error('Ошибка при создании seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
