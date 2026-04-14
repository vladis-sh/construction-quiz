import { describe, it, expect } from "vitest";
import formatPrice from "./formatPrice";

describe("formatPrice", () => {
  it("Обработка 0", () => {
    expect(formatPrice(0)).toBe("0");
  });
  it("форматирует число с разделителями тысяч", () => {
    expect(formatPrice(1000000)).toBe("1\u00A0000\u00A0000");
  });

  it("не добавляет разделитель для чисел меньше 1000", () => {
    expect(formatPrice(500)).toBe("500");
  });

  it("форматирует шестизначные числа", () => {
    expect(formatPrice(350000)).toBe("350\u00A0000");
  });

  it("обрабатывает отрицательные числа", () => {
    const result = formatPrice(-1500000);
    expect(result).toContain("1");
    expect(result).toContain("500");
    expect(result).toContain("000");
  });
});
