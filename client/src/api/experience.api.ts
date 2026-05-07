import api from "./axios";
import type { Experience, ExperiencePayload } from "../types/experience";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getExperiences() {
  const response = await api.get<ApiResponse<Experience[]>>("/experiences");
  return response.data.data;
}

export async function createExperience(payload: ExperiencePayload) {
  const response = await api.post<ApiResponse<Experience>>("/experiences", payload);
  return response.data.data;
}

export async function updateExperience(id: number, payload: Partial<ExperiencePayload>) {
  const response = await api.patch<ApiResponse<Experience>>(`/experiences/${id}`, payload);
  return response.data.data;
}

export async function deleteExperience(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/experiences/${id}`);
  return response.data;
}
