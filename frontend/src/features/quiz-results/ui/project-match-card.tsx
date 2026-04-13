import formatPrice from "../../../shared/lib/formatPrice";
import { getImageUrl } from "../../../shared/lib/get-image-url";
import type { ProjectMatch } from "../../../widgets/quiz-section/model/types";
import styles from "./project-match-card.module.scss";

interface Props {
  p: ProjectMatch;
}

export default function ProjectMatchCard({ p }: Props) {
  const imageUrl = getImageUrl(p.image);
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        {imageUrl ? <img src={imageUrl} alt={p.name} /> : null}
      </div>
      <div className={styles.body}>
        <h4 className={styles.name}>{p.name}</h4>

        <div className={styles.meta}>
          <span>{p.area} м²</span>
          <span>·</span>
          <span>Совпадение {p.score}%</span>
        </div>

        <div className={styles.price}>{formatPrice(p.base_price)} ₽</div>
      </div>
      {/** TODO */}
      {1 && (
        <div className={styles.actions}>
          <a
            className={styles.pdfLink}
            href={p.pdf}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Скачать подробный план
          </a>
        </div>
      )}
    </div>
  );
}
