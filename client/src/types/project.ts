export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string;
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectPayload = {
  title: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
};