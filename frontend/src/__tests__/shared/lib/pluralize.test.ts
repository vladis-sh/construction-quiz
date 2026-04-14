import { describe, it, expect } from "vitest";
import { pluralize } from "../../../shared/lib/pluralize";

describe("pluralize", () => {
  describe("этаж", () => {
    it("1 этаж", () => {
      expect(pluralize(1, "этаж")).toBe("1 этаж");
    });

    it("2 этажа", () => {
      expect(pluralize(2, "этаж")).toBe("2 этажа");
    });

    it("5 этажей", () => {
      expect(pluralize(5, "этаж")).toBe("5 этажей");
    });

    it("21 этаж", () => {
      expect(pluralize(21, "этаж")).toBe("21 этаж");
    });

    it("22 этажа", () => {
      expect(pluralize(22, "этаж")).toBe("22 этажа");
    });

    it("25 этажей", () => {
      expect(pluralize(25, "этаж")).toBe("25 этажей");
    });

    it("11 этажей ( случай 11–19)", () => {
      expect(pluralize(11, "этаж")).toBe("11 этажей");
    });

    it("14 этажей (случай 11–19)", () => {
      expect(pluralize(14, "этаж")).toBe("14 этажей");
    });
  });

  describe("спальня", () => {
    it("1 спальня", () => {
      expect(pluralize(1, "спальня")).toBe("1 спальня");
    });

    it("3 спальни", () => {
      expect(pluralize(3, "спальня")).toBe("3 спальни");
    });

    it("5 спален", () => {
      expect(pluralize(5, "спальня")).toBe("5 спален");
    });
  });

  describe("комната", () => {
    it("1 комната", () => {
      expect(pluralize(1, "комната")).toBe("1 комната");
    });

    it("4 комнаты", () => {
      expect(pluralize(4, "комната")).toBe("4 комнаты");
    });

    it("10 комнат", () => {
      expect(pluralize(10, "комната")).toBe("10 комнат");
    });
  });

  describe("ванная", () => {
    it("1 ванная", () => {
      expect(pluralize(1, "ванная")).toBe("1 ванная");
    });

    it("2 ванные", () => {
      expect(pluralize(2, "ванная")).toBe("2 ванные");
    });
  });

  describe("санузел", () => {
    it("1 санузел", () => {
      expect(pluralize(1, "санузел")).toBe("1 санузел");
    });

    it("2 санузла", () => {
      expect(pluralize(2, "санузел")).toBe("2 санузла");
    });

    it("6 санузлов", () => {
      expect(pluralize(6, "санузел")).toBe("6 санузлов");
    });
  });

  describe("неизвестно", () => {
    it("возвращает слово без изменений", () => {
      expect(pluralize(5, "неизвестное")).toBe("неизвестное");
    });
  });
});
