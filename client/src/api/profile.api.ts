import api from "./axios";
import type { Profile } from "../types/profile";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getProfile() {
  const response = await api.get<ApiResponse<Profile>>("/profile");
  return response.data.data;
}

export async function updateProfile(payload: Partial<Profile>) {
  const response = await api.put<ApiResponse<Profile>>("/profile", payload);
  return response.data.data;
}

export async function uploadProfileCv(file: File) {
  const formData = new FormData();
  formData.append("cv", file);

  const response = await api.post<ApiResponse<Profile>>("/profile/cv", formData);
  return response.data.data;
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ApiResponse<Profile>>("/profile/image", formData);
  return response.data.data;
}
