import api from "./axios";
import type { Skill, SkillPayload } from "../types/skill";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getSkills() {
  const response = await api.get<ApiResponse<Skill[]>>("/skills");
  return response.data.data;
}

export async function createSkill(payload: SkillPayload) {
  const response = await api.post<ApiResponse<Skill>>("/skills", payload);
  return response.data.data;
}

export async function updateSkill(id: number, payload: Partial<SkillPayload>) {
  const response = await api.patch<ApiResponse<Skill>>(`/skills/${id}`, payload);
  return response.data.data;
}

export async function deleteSkill(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/skills/${id}`);
  return response.data;
}