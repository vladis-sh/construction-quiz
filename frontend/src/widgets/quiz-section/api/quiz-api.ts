import { API_BASE_URL } from "../../../shared/api/base";

export interface QuizOption {
  id: number;
  label: string;
  value: string;
  order: number;
}

export interface QuizQuestion {
  id: number;
  title: string;
  key: string;
  options: QuizOption[];
}

export interface ProjectMatch {
  id: number;
  name: string;
  area: number;
  base_price: number;
  image: string | null;
  score: number;
}

//TODO:

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  const res = await fetch(`${API_BASE_URL}/quiz/questions`);
  if (!res.ok) throw new Error("Failed to fetch quiz questions");
  return res.json();
}

export async function createQuizSession(): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE_URL}/quiz`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create quiz session");
  return res.json();
}

export async function submitQuizAnswers(
  quizId: number,
  answers: { questionId: number; optionId: number }[],
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/quiz/${quizId}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("Failed to submit quiz answers");
}

export async function fetchQuizMatches(
  quizId: number,
): Promise<ProjectMatch[]> {
  const res = await fetch(`${API_BASE_URL}/quiz/${quizId}/matches`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to compute quiz matches");
  return res.json();
}
