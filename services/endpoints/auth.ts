import {
  CreateAccountPayload,
  AuthResponse,
  LoginPayload,
  LoginResponse,
  OtpRequestResponse,
  OtpVerifyResponse,
} from "@/types/authType";
import { post } from "../axios";

export const AuthService = {
  createAccount: async (
    payload: CreateAccountPayload
  ): Promise<AuthResponse> => {
    const response = await post<AuthResponse>("/auth/admin/register", payload);
    return response;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await post<LoginResponse>("/auth/admin/login", payload);
    return response;
  },
};
