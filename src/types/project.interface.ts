export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  features?: string[];
  challenges?: string;
  solutions?: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  imageUrl?: string;
  projectUrl?: string;
  category?: string;
}