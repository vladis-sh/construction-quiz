import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuizResults from "./quiz-results";
import type { ProjectMatch } from "../../../widgets/quiz-section/model/types";

const mockProject: ProjectMatch = {
  id: 1,
  name: "Дом 120м²",
  area: 120,
  base_price: 3500000,
  score: 87,
  image: null,
  pdf: null,
};

describe("QuizResults", () => {
  it("Заголовок отображается", () => {
    render(<QuizResults results={[]} resultsError={null} />);
    expect(screen.getByText("Ваши персональные проекты")).toBeInTheDocument();
  });

  it("Показывает сообщение если нет результата", () => {
    render(<QuizResults results={[]} resultsError={null} />);
    expect(
      screen.getByText("По вашему запросу пока ничего не найдено."),
    ).toBeInTheDocument();
  });

  it("Показывает ошибку", () => {
    render(
      <QuizResults
        results={[]}
        resultsError="Не удалось загрузить результаты"
      />,
    );
    expect(
      screen.getByText("Не удалось загрузить результаты"),
    ).toBeInTheDocument();
  });

  it("Счётчик найденных проектов показывается", () => {
    render(
      <QuizResults
        results={[mockProject, { ...mockProject, id: 2 }]}
        resultsError={null}
      />,
    );
    expect(
      screen.getByText("Мы нашли 2 подходящих проектов:"),
    ).toBeInTheDocument();
  });

  it("Показывает карточки проекта", () => {
    render(<QuizResults results={[mockProject]} resultsError={null} />);
    expect(screen.getByText("Дом 120м²")).toBeInTheDocument();
  });

  it("Кнопка звонка", () => {
    render(<QuizResults results={[]} resultsError={null} />);
    expect(screen.getByText("Позвонить нам")).toBeInTheDocument();
  });
});
