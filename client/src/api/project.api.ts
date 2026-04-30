import api from "./axios";
import type { Project, ProjectPayload } from "../types/project";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getProjects() {
  const response = await api.get<ApiResponse<Project[]>>("/projects");
  return response.data.data;
}

export async function createProject(payload: ProjectPayload) {
  const response = await api.post<ApiResponse<Project>>("/projects", payload);
  return response.data.data;
}

export async function updateProject(id: number, payload: Partial<ProjectPayload>) {
  const response = await api.patch<ApiResponse<Project>>(`/projects/${id}`, payload);
  return response.data.data;
}

export async function deleteProject(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/projects/${id}`);
  return response.data;
}
