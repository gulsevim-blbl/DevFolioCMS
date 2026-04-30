export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SkillPayload = {
  name: string;
  category: string;
  level?: number;
  sortOrder?: number;
  published?: boolean;
};