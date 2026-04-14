import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useQuiz } from "../../../../widgets/quiz-section/model/use-quiz";
import * as quizApi from "../../../../widgets/quiz-section/api/quiz-api";

vi.mock("../../../../widgets/quiz-section/api/quiz-api", () => ({
  fetchQuizQuestions: vi.fn(),
  createQuizSession: vi.fn(),
  submitQuizAnswers: vi.fn(),
  fetchQuizMatches: vi.fn(),
}));

const mockQuestions: quizApi.QuizQuestion[] = [
  {
    id: 1,
    title: "Сколько этажей?",
    key: "floors",
    options: [
      { id: 10, label: "1 этаж", value: "1", order: 1 },
      { id: 11, label: "2 этажа", value: "2", order: 2 },
    ],
  },
  {
    id: 2,
    title: "Площадь дома?",
    key: "area",
    options: [
      { id: 20, label: "До 100 м²", value: "small", order: 1 },
      { id: 21, label: "100–150 м²", value: "medium", order: 2 },
    ],
  },
];

const mockMatches: quizApi.ProjectMatch[] = [
  {
    id: 1,
    name: "Дом-1",
    area: 100,
    base_price: 3000000,
    score: 90,
    image: null,
    pdf: null,
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(quizApi.fetchQuizQuestions).mockResolvedValue(mockQuestions);
  vi.mocked(quizApi.createQuizSession).mockResolvedValue({ id: 99 });
  vi.mocked(quizApi.submitQuizAnswers).mockResolvedValue(undefined);
  vi.mocked(quizApi.fetchQuizMatches).mockResolvedValue(mockMatches);
});

// дожидаемся загрузки вопросов
async function setup() {
  const hook = renderHook(() => useQuiz());
  await waitFor(() => expect(hook.result.current.questionsLoading).toBe(false));
  return hook;
}

describe("useQuiz - начальное состояние", () => {
  it("quiz закрыт по умолчанию", async () => {
    const { result } = await setup();
    expect(result.current.isOpen).toBe(false);
    expect(result.current.step).toBe("idle");
  });

  it("загружает вопросы ", async () => {
    const { result } = await setup();
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it("currentIndex начинается с 0", async () => {
    const { result } = await setup();
    expect(result.current.currentIndex).toBe(0);
  });

  it("progressBar = 50% на первом из двух вопросов", async () => {
    const { result } = await setup();
    expect(result.current.progressBar).toBe(50);
  });
});

describe("обработка ошибок загрузки вопросов", () => {
  it("устанавливает questionsError при сбое", async () => {
    vi.mocked(quizApi.fetchQuizQuestions).mockRejectedValue(new Error("fail"));
    const { result } = await setup();
    expect(result.current.questionsError).toBe("Не удалось загрузить вопросы");
  });
});

describe("открывает openQuiz", () => {
  it("открывает квиз и устанавливает step=questions", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.step).toBe("questions");
  });

  it("вызов createQuizSession", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    expect(quizApi.createQuizSession).toHaveBeenCalledTimes(1);
  });

  it("сбрасывает ответы и индекс при повторном открытии", async () => {
    const { result } = await setup();

    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });

    await act(async () => {
      result.current.closeQuiz();
    });
    await act(async () => {
      await result.current.openQuiz();
    });

    // selectedOptionId - undefined когда ответ не выбран
    expect(result.current.selectedOptionId).toBeUndefined();
    expect(result.current.currentIndex).toBe(0);
  });

  it("устанавливает sessionError если createQuizSession провалился", async () => {
    vi.mocked(quizApi.createQuizSession).mockRejectedValue(new Error("fail"));
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.sessionError).toBe(
      "Не удалось создать сессию с опросом",
    );
  });
});

describe("closeQuiz", () => {
  it("закрывает квиз и возвращает step=idle", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.closeQuiz();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.step).toBe("idle");
  });
});

describe("selectOption", () => {
  it("сохраняет выбранный вариант", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    expect(result.current.selectedOptionId).toBe(10);
  });

  it("позволяет изменить ответ", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    act(() => {
      result.current.selectOption(11);
    });
    expect(result.current.selectedOptionId).toBe(11);
  });
});

describe("навигация (goPrev / goNext)", () => {
  it("goNext переходит к следующему вопросу", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });
    expect(result.current.currentIndex).toBe(1);
  });

  it("goPrev не уходит ниже 0", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.goPrev();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("goPrev возвращается к предыдущему вопросу", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });
    act(() => {
      result.current.goPrev();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("isLastQuestion=true на последнем вопросе", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });
    expect(result.current.isLastQuestion).toBe(true);
  });

  it("goNext не переходит если нет выбранного ответа", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    // selectedOptionId = undefined, goNext не должен переходить
    await act(async () => {
      await result.current.goNext();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("progressBar = 100% на последнем вопросе", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });
    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });
    expect(result.current.progressBar).toBe(100);
  });
});

describe("useQuiz — отправка ответов и результаты", () => {
  it("отправляет ответы и показывает результаты", async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });

    // Вопрос 1
    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });

    // Вопрос 2 (последний) — читаем свежий result.current после перехода
    act(() => {
      result.current.selectOption(20);
    });
    await act(async () => {
      await result.current.goNext();
    });

    expect(quizApi.submitQuizAnswers).toHaveBeenCalledWith(
      99,
      expect.arrayContaining([
        { questionId: 1, optionId: 10 },
        { questionId: 2, optionId: 20 },
      ]),
    );
    expect(result.current.step).toBe("results");
    expect(result.current.results).toEqual(mockMatches);
  });

  it("устанавливает resultsError если submitQuizAnswers провалился", async () => {
    vi.mocked(quizApi.submitQuizAnswers).mockRejectedValue(new Error("fail"));
    const { result } = await setup();
    await act(async () => {
      await result.current.openQuiz();
    });

    act(() => {
      result.current.selectOption(10);
    });
    await act(async () => {
      await result.current.goNext();
    });
    act(() => {
      result.current.selectOption(20);
    });
    await act(async () => {
      await result.current.goNext();
    });

    expect(result.current.step).toBe("results");
    expect(result.current.resultsError).toBe("Не удалось загрузить результаты");
    expect(result.current.results).toEqual([]);
  });
});
