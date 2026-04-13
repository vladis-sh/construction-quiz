import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type ProjectMatch,
  type QuizQuestion,
  createQuizSession,
  fetchQuizMatches,
  fetchQuizQuestions,
  submitQuizAnswers,
} from "../api/quiz-api";
type QuizSteps = "idle" | "questions" | "submitting" | "results";
type AnswersType = Record<number, number>;
export const useQuiz = () => {
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState<QuizSteps>("idle");

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  const [quizId, setQuizId] = useState<number | null>(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});

  const [results, setResults] = useState<ProjectMatch[]>([]);
  const [resultsError, setResultsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setQuestionsLoading(true);
    setQuestionsError(null);

    fetchQuizQuestions()
      .then(data => {
        if (cancelled) return;
        setQuestions(data);
      })
      .catch(() => {
        if (cancelled) return;
        setQuestionsError("Не удалось загрузить вопросы");
      })
      .finally(() => {
        if (cancelled) return;
        setQuestionsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const currentQuestion = questions[currentIndex]; //Как вести себя дома?

  const selectedOptionId = useMemo(() => {
    if (!currentQuestion) return null;
    return answers[currentQuestion.id];
  }, [answers, currentQuestion]);

  const progressBar =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  const openQuiz = useCallback(async () => {
    setSessionLoading(true);
    setSessionError(null);
    setResults([]);
    setResultsError(null);
    setAnswers({});
    setCurrentIndex(0);
    setQuizId(null);
    try {
      const session = await createQuizSession();
      setQuizId(session.id);
      setStep("questions");
      setOpen(true);
    } catch {
      setSessionError("Не удалось создать сессию с опросом");
      setOpen(false);
      setStep("idle");
    } finally {
      setSessionLoading(false);
    }
  }, []);
  const closeQuiz = useCallback(() => {
    setOpen(false);
    setStep("idle");
  }, []);

  //optionId - id варианта ответа
  const selectOption = useCallback(
    (optionId: number) => {
      if (!currentQuestion) {
        return null;
      }
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    },
    [currentQuestion],
  );
  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);
  const goNext = useCallback(async () => {
    if (!currentQuestion || selectedOptionId === null) {
      return;
    }
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
      return;
    }
    if (!quizId) {
      setResultsError("Сессия опроса не найдена. Попробуйте пройти заново.");
      setStep("results");
      return;
    }
    setStep("submitting");
    setResultsError(null);

    const answersArr = Object.entries(answers).map(
      ([questionId, optionId]) => ({
        questionId: Number(questionId),
        optionId,
      }),
    );
    try {
      await submitQuizAnswers(quizId, answersArr);
      const matches = await fetchQuizMatches(quizId);
      setResults(matches);
    } catch {
      setResultsError("Не удалось загрузить результаты");
    } finally {
      setStep("results");
    }
  }, [answers, currentQuestion, isLastQuestion, quizId, selectedOptionId]);
  return {
    isOpen,
    step,
    questions,
    questionsLoading,
    questionsError,
    sessionLoading,
    sessionError,
    currentIndex,
    currentQuestion,
    selectedOptionId,
    progressBar,
    isLastQuestion,
    results,
    resultsError,
    openQuiz,
    closeQuiz,
    selectOption,
    goPrev,
    goNext,
  };
};
