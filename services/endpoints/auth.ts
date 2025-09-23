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
    const response = await post<AuthResponse>("/auth/create-account", payload);
    return response;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await post<LoginResponse>("/auth/login", payload);
    return response;
  },

  requestOtp: async (email: string): Promise<OtpRequestResponse> => {
    const response = await post<OtpRequestResponse>("/auth/request-otp", {
      email,
    });
    return response;
  },

  verifyOtp: async (payload: {
    email: string;
    otp: string;
  }): Promise<OtpVerifyResponse> => {
    const response = await post<OtpVerifyResponse>("/auth/verify-otp", payload);
    return response;
  },
};
