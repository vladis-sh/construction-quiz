import styles from "./quiz-navigation.module.scss";

interface QuizNavigationProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
}
export default function QuizNavigation({
  canGoBack,
  canGoNext,
  isLast,
  onPrev,
  onNext,
}: QuizNavigationProps) {
  return (
    <div className={styles.nav}>
      {canGoBack ? (
        <button className={styles.prev} onClick={onPrev}>
          ← Назад
        </button>
      ) : null}
      <button className={styles.next} onClick={onNext} disabled={!canGoNext}>
        {isLast ? "Показать результаты" : "Далее →"}
      </button>
    </div>
  );
}
