import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizOptionCard } from "../../../../features/quiz-option-btn/ui/quiz-option-btn";

describe("QuizOptionCard", () => {
  it("отображает дочерний контент", () => {
    render(<QuizOptionCard>Вариант ответа</QuizOptionCard>);
    expect(screen.getByText("Вариант ответа")).toBeInTheDocument();
  });

  it("рендерит кнопку", () => {
    render(<QuizOptionCard>Текст</QuizOptionCard>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("вызывает onClick при клике", async () => {
    const handleClick = vi.fn();
    render(<QuizOptionCard onClick={handleClick}>Нажми меня</QuizOptionCard>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("применяет класс selected когда selected=true", () => {
    render(<QuizOptionCard selected>Выбранный</QuizOptionCard>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("selected");
  });

  it("не применяет класс selected когда selected=false", () => {
    render(<QuizOptionCard selected={false}>Невыбранный</QuizOptionCard>);
    const btn = screen.getByRole("button");
    expect(btn.className).not.toContain("selected");
  });

  it("по умолчанию selected=false", () => {
    render(<QuizOptionCard>Обычный</QuizOptionCard>);
    const btn = screen.getByRole("button");
    expect(btn.className).not.toContain("selected");
  });
});
