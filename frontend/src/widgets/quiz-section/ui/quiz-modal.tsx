import { QuizQuestionStep } from "../../../features/quiz-question-step/ui/quiz.quiestion-step";
import QuizResults from "../../../features/quiz-results/ui/quiz-results";
import type { ProjectMatch, QuizQuestion } from "../api/quiz-api";
import styles from "./quiz-modal.module.scss";

interface QuizModalProps {
  quiz: {
    isOpen: boolean;
    step: "idle" | "questions" | "submitting" | "results";
    currentIndex: number;
    currentQuestion: QuizQuestion | null;
    selectedOptionId: number | null;
    progressBar: number;
    isLastQuestion: boolean;
    questions: QuizQuestion[];
    results: ProjectMatch[];
    resultsError: string | null;
    closeQuiz: () => void;
    selectOption: (id: number) => void;
    goPrev: () => void;
    goNext: () => void;
  };
}
export default function QuizModal({ quiz }: QuizModalProps) {
  if (!quiz.isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      quiz.closeQuiz();
    }
  };
  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          aria-label="Закрыть"
          onClick={quiz.closeQuiz}
        >
          ×
        </button>

        {quiz.step === "questions" && quiz.currentQuestion && (
          <QuizQuestionStep
            question={quiz.currentQuestion}
            currentIndex={quiz.currentIndex}
            total={quiz.questions.length}
            progress={quiz.progressBar}
            selectedOptionId={quiz.selectedOptionId}
            isLast={quiz.isLastQuestion}
            onSelect={quiz.selectOption}
            onPrev={quiz.goPrev}
            onNext={quiz.goNext}
          />
        )}

        {quiz.step === "submitting" && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Подбираем проекты...</p>
          </div>
        )}

        {quiz.step === "results" && (
          <QuizResults results={quiz.results} error={quiz.resultsError} />
        )}
      </div>
    </div>
  );
}
