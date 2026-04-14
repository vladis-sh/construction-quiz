import { describe, it, expect } from "vitest";
import { buildDescription } from "./description";
import type { Project } from "../api/projects-api";

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    name: "Тестовый проект",
    slug: "test",
    base_price: 500000,
    area: 120,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    projectImages: [],
    projectFloors: [{ id: 1, floorName: "1 этаж" }],
    projectOpenings: [],
    ...overrides,
  };
}

describe("buildDescription", () => {
  it("одноэтажный дом без спален", () => {
    const project = makeProject({
      projectFloors: [{ id: 1, floorName: "1 этаж" }],
      projectOpenings: [],
      area: 80,
    });
    expect(buildDescription(project)).toBe("Одноэтажный дом, площадью 80 кв.м");
  });

  it("двухэтажный дом с двумя спальнями", () => {
    const project = makeProject({
      projectFloors: [
        { id: 1, floorName: "1 этаж" },
        { id: 2, floorName: "2 этаж" },
      ],
      projectOpenings: [
        { id: 1, openingType: "room", zoneName: "Спальня 1" },
        { id: 2, openingType: "room", zoneName: "Спальня 2" },
      ],
      area: 150,
    });
    expect(buildDescription(project)).toBe(
      "Двухэтажный дом, с двумя спальнями, площадью 150 кв.м",
    );
  });

  it("одноэтажный дом с одной спальней", () => {
    const project = makeProject({
      projectFloors: [{ id: 1, floorName: "1 этаж" }],
      projectOpenings: [
        { id: 1, openingType: "room", zoneName: "Спальня 1" },
      ],
      area: 90,
    });
    expect(buildDescription(project)).toBe(
      "Одноэтажный дом, с одной спальней, площадью 90 кв.м",
    );
  });

  it("считает 'жилая комната' как спальню", () => {
    const project = makeProject({
      projectOpenings: [
        { id: 1, openingType: "room", zoneName: "Жилая комната 1" },
        { id: 2, openingType: "room", zoneName: "Жилая комната 2" },
        { id: 3, openingType: "room", zoneName: "Жилая комната 3" },
      ],
      area: 130,
    });
    expect(buildDescription(project)).toBe(
      "Одноэтажный дом, с тремя спальнями, площадью 130 кв.м",
    );
  });

  it("не учитывает другие помещения как спальни", () => {
    const project = makeProject({
      projectOpenings: [
        { id: 1, openingType: "room", zoneName: "Кухня" },
        { id: 2, openingType: "room", zoneName: "Гостиная" },
        { id: 3, openingType: "room", zoneName: "Санузел" },
      ],
      area: 100,
    });
    expect(buildDescription(project)).toBe(
      "Одноэтажный дом, площадью 100 кв.м",
    );
  });

  it("содержит площадь проекта", () => {
    const project = makeProject({ area: 200 });
    expect(buildDescription(project)).toContain("200 кв.м");
  });
});
