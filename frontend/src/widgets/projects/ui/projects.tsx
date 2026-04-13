import { useEffect, useState } from "react";
import styles from "./projects.module.scss";
import Container from "../../../shared/ui/container/container";
import { fetchProjects } from "../api/projects-api";
import type { Project } from "../api/projects-api";
import { buildDescription } from "../lib/description";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <h2 className={styles.projects__title}>ПРОЕКТЫ</h2>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        <div className={styles.projects__grid}>
          {projects.map((project: Project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.card__image}>
                <img
                  src={
                    project.projectImages?.[0]?.imageUrl
                      ? `${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}${project.projectImages[0].imageUrl}`
                      : ""
                  }
                  alt={project.name}
                />
              </div>
              <div className={styles.card__body}>
                <h3 className={styles.card__name}>{project.name}</h3>
                <p className={styles.card__description}>
                  {buildDescription(project)}
                </p>
                <p className={styles.card__price}>
                  {project.base_price.toLocaleString("ru-RU")} руб.
                </p>
              </div>
              <div className={styles.card__actions}>
                <button className={styles.card__btn}>
                  ПОДРОБНЕЕ О ПРОЕКТЕ
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
