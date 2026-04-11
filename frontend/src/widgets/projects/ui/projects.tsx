import styles from "./projects.module.scss";
import Container from "../../../shared/ui/container/container";

interface Project {
  id: number;
  name: string;
  description: string;
  area: number;
  price: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "ТЭСС – 80",
    description: "Одноэтажный дом с двумя спальнями и площадью 80 кв м",
    area: 80,
    price: "10 350 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=ТЭСС+80",
  },
  {
    id: 2,
    name: "ОРИОН – 83",
    description: "Одноэтажный дом с двумя спальнями и площадью 83 кв м",
    area: 83,
    price: "10 760 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=ОРИОН+83",
  },
  {
    id: 3,
    name: "АЛЬФА – 95",
    description: "Одноэтажный дом с тремя спальнями и площадью 95 кв м",
    area: 95,
    price: "12 100 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=АЛЬФА+95",
  },
  {
    id: 4,
    name: "СИРИУС – 110",
    description: "Двухэтажный дом с четырьмя спальнями и площадью 110 кв м",
    area: 110,
    price: "14 500 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=СИРИУС+110",
  },
  {
    id: 5,
    name: "АЛЬФА – 95",
    description: "Одноэтажный дом с тремя спальнями и площадью 95 кв м",
    area: 95,
    price: "12 100 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=АЛЬФА+95",
  },
  {
    id: 6,
    name: "СИРИУС – 110",
    description: "Двухэтажный дом с четырьмя спальнями и площадью 110 кв м",
    area: 110,
    price: "14 500 000 руб.",
    image: "https://placehold.co/400x260/cccccc/666666?text=СИРИУС+110",
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <Container>
        <h2 className={styles.projects__title}>ПРОЕКТЫ</h2>
        <div className={styles.projects__grid}>
          {PROJECTS.map((project: Project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.card__image}>
                <img src={project.image} alt={project.name} />
              </div>
              <div className={styles.card__body}>
                <h3 className={styles.card__name}>{project.name}</h3>
                <p className={styles.card__description}>
                  {project.description}
                </p>
                <p className={styles.card__price}>{project.price}</p>
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
