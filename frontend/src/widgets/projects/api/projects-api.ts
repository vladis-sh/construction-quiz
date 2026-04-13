import { API_BASE_URL } from "../../../shared/api/base";

export interface ProjectImage {
  id: number;
  imageUrl: string;
}

export interface ProjectFloor {
  id: number;
  floorName: string;
}

export interface ProjectOpening {
  id: number;
  openingType: string;
  zoneName: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  area: number;
  created_at: string;
  updated_at: string;
  projectImages: ProjectImage[];
  projectFloors: ProjectFloor[];
  projectOpenings: ProjectOpening[];
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}
