export type Experience = {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  location: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ExperiencePayload = {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  location?: string;
  sortOrder?: number;
  published?: boolean;
};