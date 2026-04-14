import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectMatchCard from "../../../../features/quiz-results/ui/project-match-card";
import type { ProjectMatch } from "../../../../widgets/quiz-section/model/types";

const baseProject: ProjectMatch = {
  id: 49,
  name: "Проект Демо",
  area: 100,
  base_price: 2800000,
  score: 75,
  image: null,
  pdf: null,
};

describe("ProjectMatchCard", () => {
  it("Показывает название проекта", () => {
    render(<ProjectMatchCard p={baseProject} />);
    expect(screen.getByText("Проект Демо")).toBeInTheDocument();
  });

  it("Показывает площадь", () => {
    render(<ProjectMatchCard p={baseProject} />);
    expect(screen.getByText("100 м²")).toBeInTheDocument();
  });

  it("Показывает процент совпадения", () => {
    render(<ProjectMatchCard p={baseProject} />);
    expect(screen.getByText("Совпадение 75%")).toBeInTheDocument();
  });

  it("Не показывает изображение если image=null", () => {
    render(<ProjectMatchCard p={{ ...baseProject, image: null }} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("Показывает картинку если задана", () => {
    render(
      <ProjectMatchCard p={{ ...baseProject, image: "/img/house.jpg" }} />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Проект Демо");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("/img/house.jpg"),
    );
  });

  it("Ссылка на PDF содержит правильный href", () => {
    render(<ProjectMatchCard p={baseProject} />);
    const link = screen.getByText("Скачать подробный план").closest("a");
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("/projects/49/pdf"),
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
