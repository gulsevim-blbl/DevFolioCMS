import api from "./axios";
import type { LoginPayload, LoginResponse } from "../types/auth";

export async function loginRequest(payload: LoginPayload) {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}