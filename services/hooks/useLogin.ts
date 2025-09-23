import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthService } from "../endpoints/auth";
import { LoginPayload, LoginResponse } from "../../types/authType";
import { toast } from "sonner";
import { TError } from "@/types/errorType";

interface Options {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: TError) => void;
}

export const useLogin = (
  options?: Options
): UseMutationResult<LoginResponse, TError, LoginPayload, unknown> => {
  return useMutation<LoginResponse, TError, LoginPayload>({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),

    onSuccess: (data) => {
      if (data.status === true) {
        toast.success(data.message || "Account logged in successfully", {description: "You are being redirected..."});
        options?.onSuccess?.(data);
      } else {
        toast.error(data.message || "Login failed");
      }
    },

    onError: (error: TError) => {
      const message =
        error?.response?.data?.message || error?.message || "Failed to login, try again later.";
      toast.error(message);
      options?.onError?.(error);
    },
  });
};
