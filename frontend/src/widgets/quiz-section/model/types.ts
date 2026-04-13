export interface QuizOption {
  id: number;
  label: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  options: QuizOption[];
}

export interface ProjectMatch {
  id: number;
  name: string;
  area: number;
  score: number;
  base_price: number;
  image: string | null;
  pdf: string | null;
}
