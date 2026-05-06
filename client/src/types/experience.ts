export type Experience = {
  id: number;
  company: string;
  companyTr?: string | null;
  position: string;
  positionTr?: string | null;
  description: string;
  descriptionTr?: string | null;
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
  companyTr?: string;
  position: string;
  positionTr?: string;
  description: string;
  descriptionTr?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  location?: string;
  sortOrder?: number;
  published?: boolean;
};
