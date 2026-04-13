import styles from "./quiz-option-btn.module.scss";

interface QuizOptionCardProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function QuizOptionCard({
  selected = false,
  onClick,
  children,
}: QuizOptionCardProps) {
  return (
    <button
      className={`${styles.btn} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
