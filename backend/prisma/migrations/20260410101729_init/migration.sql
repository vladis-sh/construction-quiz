-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "base_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFoundation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "preparation_description" TEXT NOT NULL,
    "foundation_type" TEXT NOT NULL,
    "thickness_mm" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectFoundation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectWall" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "wallType" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "density" TEXT NOT NULL,
    "strengthClass" TEXT NOT NULL,
    "blockLengthMm" INTEGER NOT NULL,
    "blockHeightMm" INTEGER NOT NULL,
    "blockThicknessMm" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectWall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFloor" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "floorName" TEXT NOT NULL,
    "structureType" TEXT NOT NULL,
    "insulationMaterial" TEXT NOT NULL,
    "insulationThicknessMm" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectFloor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRoof" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "roofType" TEXT NOT NULL,
    "finishMaterial" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectRoof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFacade" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "facadeName" TEXT NOT NULL,
    "insulationMaterial" TEXT NOT NULL,
    "insulationThicknessMm" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectFacade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectOpening" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "openingType" TEXT NOT NULL,
    "zoneName" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "profileWidthMm" INTEGER NOT NULL,
    "widthMm" INTEGER NOT NULL,
    "heightMm" INTEGER NOT NULL,
    "coating" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectOpening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectElectricalSystems" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "commitDescription" TEXT NOT NULL,

    CONSTRAINT "ProjectElectricalSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHeatingSystems" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "systemType" TEXT NOT NULL,
    "baseInsulationMaterial" TEXT NOT NULL,
    "baseInsulationThicknessMm" INTEGER NOT NULL,
    "fillingDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commitDescription" TEXT NOT NULL,

    CONSTRAINT "ProjectHeatingSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectWaterSupplySystems" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "systemType" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectWaterSupplySystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSewerSystems" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectSewerSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBoilerRooms" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "boilerType" TEXT NOT NULL,
    "equipmentDescription" TEXT NOT NULL,
    "customerEquipmentDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectBoilerRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInterior" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectInterior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectExternalNetworks" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "waterSource" TEXT NOT NULL,
    "sewer" TEXT NOT NULL,
    "landscaping" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectExternalNetworks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFoundation" ADD CONSTRAINT "ProjectFoundation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWall" ADD CONSTRAINT "ProjectWall_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFloor" ADD CONSTRAINT "ProjectFloor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRoof" ADD CONSTRAINT "ProjectRoof_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFacade" ADD CONSTRAINT "ProjectFacade_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectOpening" ADD CONSTRAINT "ProjectOpening_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectElectricalSystems" ADD CONSTRAINT "ProjectElectricalSystems_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHeatingSystems" ADD CONSTRAINT "ProjectHeatingSystems_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWaterSupplySystems" ADD CONSTRAINT "ProjectWaterSupplySystems_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSewerSystems" ADD CONSTRAINT "ProjectSewerSystems_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBoilerRooms" ADD CONSTRAINT "ProjectBoilerRooms_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInterior" ADD CONSTRAINT "ProjectInterior_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectExternalNetworks" ADD CONSTRAINT "ProjectExternalNetworks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
