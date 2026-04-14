import styles from "./start-quiz-btn.module.scss";

interface StartQuizBtnProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function StartQuizBtn({
  onClick,
  loading = false,
  disabled = false,
}: StartQuizBtnProps) {
  return (
    <button
      className={styles.startBtn}
      onClick={onClick}
      disabled={disabled || loading}
    >
      Пройти опрос
    </button>
  );
}
