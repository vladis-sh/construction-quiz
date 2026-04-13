import Container from "../../../shared/ui/container/container";
import { useQuiz } from "../model/use-quiz";
import QuizModal from "./quiz-modal";
import styles from "./quiz-section.module.scss";

export default function QuizSection() {
  const quiz = useQuiz();
  return (
    <>
      <section className={styles.section}>
        <Container>
          <div className={styles.inner}>
            <div className={styles.content}>
              <h2 className={styles.title}>ПОДБЕРИ СВОЙ ПЕРСОНАЛЬНЫЙ ПРОЕКТ</h2>
              <p className={styles.description}>
                Ответьте на несколько вопросов и мы покажем проекты домов,
                которые подойдут именно вам
              </p>
            </div>
            <button
              className={styles.startBtn}
              onClick={quiz.openQuiz}
              disabled={quiz.questionsLoading || quiz.questions.length === 0}
            >
              {quiz.questionsLoading || quiz.sessionLoading
                ? "Загрузка..."
                : "Пройти опрос"}
            </button>
          </div>
        </Container>
      </section>
      <QuizModal quiz={quiz} />
    </>
  );
}
//TODO: ( quiz,questionsLoading )
