import { StartQuizBtn } from "../../../features/start-quiz";
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
            <StartQuizBtn
              onClick={quiz.openQuiz}
              loading={quiz.questionsLoading || quiz.sessionLoading}
              disabled={quiz.questions.length === 0}
            />
          </div>
        </Container>
      </section>
      <QuizModal quiz={quiz} />
    </>
  );
}
