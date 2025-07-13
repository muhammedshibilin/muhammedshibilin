export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  features: string[];
  challenges?: string;
  solutions?: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  role: string[];
  createdAt?: Date;
  updatedAt?: Date;
}