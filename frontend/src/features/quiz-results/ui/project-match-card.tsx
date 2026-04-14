import { DownloadPdfBtn } from "../../../features/download-pdf";
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
      <div className={styles.actions}>
        <DownloadPdfBtn projectId={p.id} />
      </div>
    </div>
  );
}
