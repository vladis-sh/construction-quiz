import type { Project } from "../api/projects-api";

export function buildDescription(project: Project) {
  const floorsCount = project.projectFloors.length ?? 1;
  const floorWord = floorsCount === 1 ? "Одноэтажный" : "Двухэтажный";
  // Спальни - жилая комната и спалья

  const bedroomsZones = project.projectOpenings.filter(room => {
    return (
      room.zoneName.toLowerCase().startsWith("спальня") ||
      room.zoneName.toLowerCase().startsWith("жилая комната")
    );
  });
  const bedroomCount = bedroomsZones.length;

  const bedroomWords: Record<number, string> = {
    1: "с одной спальней",
    2: "с двумя спальнями",
    3: "с тремя спальнями",
    4: "с четырьмя спальнями",
  };
  const bedroomPart =
    bedroomCount > 0
      ? (bedroomWords[bedroomCount] ?? `с ${bedroomCount} спальнями`)
      : "";

  const areaPart = `площадью ${project.area} кв.м`;
  return [floorWord + " дом", bedroomPart, areaPart].filter(Boolean).join(", ");
}
