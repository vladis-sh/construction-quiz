import ProjectMatchCard from "./project-match-card";
import styles from "./quiz-results.module.scss";
import type { ProjectMatch } from "../../../widgets/quiz-section/model/types";

interface QuizResultsProps {
  results: ProjectMatch[];
  resultsError: string | null;
}
export default function QuizResults({
  results,
  resultsError,
}: QuizResultsProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваши персональные проекты</h3>
      {resultsError ? (
        <p className={styles.error}>{resultsError}</p>
      ) : results.length === 0 ? (
        <p className={styles.empty}>
          По вашему запросу пока ничего не найдено.
        </p>
      ) : (
        <>
          <p className={styles.subtitle}>
            Мы нашли {results.length} подходящих проектов:
          </p>

          <div className={styles.list}>
            {results.map(project => (
              <ProjectMatchCard key={project.id} p={project} />
            ))}
          </div>
        </>
      )}
      {/** Contacts Phone Tg Whatsapp */}
      <div className={styles.contacts}>
        <div className={styles.contactsRow}>
          <a href="tel:+1234567890" className={styles.phoneBtn}>
            Позвонить нам
          </a>
        </div>
      </div>
    </div>
  );
}
