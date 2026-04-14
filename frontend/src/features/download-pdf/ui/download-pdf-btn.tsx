import { API_BASE_URL } from "../../../shared/api/base";
import styles from "./download-pdf-btn.module.scss";

interface DownloadPdfBtnProps {
  projectId: number;
}

export default function DownloadPdfBtn({ projectId }: DownloadPdfBtnProps) {
  return (
    <a
      className={styles.pdfLink}
      href={`${API_BASE_URL}/projects/${projectId}/pdf`}
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
  );
}
