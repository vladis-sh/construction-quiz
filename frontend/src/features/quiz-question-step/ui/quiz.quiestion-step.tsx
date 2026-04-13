import type { QuizQuestion } from "../../../widgets/quiz-section/api/quiz-api";
import QuizNavigation from "../../quiz-navigation/ui/quiz-navigation";
import { QuizOptionCard } from "../../quiz-option-btn/ui/quiz-option-btn";
import styles from "./quiz-question-step.module.scss";

interface ProgressBarProps {
  current: number;
  total: number;
  value: number;
}
interface QuestionStepProps {
  question: QuizQuestion;
  currentIndex: number;
  total: number;
  progress: number;
  selectedOptionId: number | null;
  isLast: boolean;
  onSelect: (optionId: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ProgressBar({ current, total, value }: ProgressBarProps) {
  return (
    <div className={styles.progressBar}>
      <span className={styles.progressLabel}>
        Вопрос {current} из {total}
      </span>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
export function QuizQuestionStep({
  question,
  currentIndex,
  total,
  progress,
  selectedOptionId,
  isLast,
  onSelect,
  onPrev,
  onNext,
}: QuestionStepProps) {
  return (
    <div className={styles.step}>
      <ProgressBar current={currentIndex + 1} total={total} value={progress} />

      <h3 className={styles.title}>{question.title}</h3>

      <div className={styles.options}>
        {question.options.map(option => (
          <QuizOptionCard
            key={option.id}
            selected={selectedOptionId === option.id}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </QuizOptionCard>
        ))}
      </div>

      <QuizNavigation
        canGoBack={currentIndex > 0}
        canGoNext={selectedOptionId !== null}
        isLast={isLast}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
}
