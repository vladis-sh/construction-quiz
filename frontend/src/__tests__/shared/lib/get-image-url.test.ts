import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getImageUrl } from "../../../shared/lib/get-image-url";

describe("getImageUrl", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "http://api.example.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("возвращает null если path равен null", () => {
    expect(getImageUrl(null)).toBeNull();
  });

  it("возвращает null если path пустая строка", () => {
    expect(getImageUrl("")).toBeNull();
  });

  it("корректный URL из env + path", () => {
    expect(getImageUrl("/images/house.jpg")).toBe(
      "http://api.example.com/images/house.jpg",
    );
  });
});
