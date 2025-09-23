import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../endpoints/auth";
import { CreateAccountPayload } from "../../types/authType";
import { toast } from "sonner";
import { TError } from "@/types/errorType";

interface Options {
  onSuccess?: () => void;
  onError?: (error: TError) => void;
}

export const useCreateAccount = (options?: Options) => {
  return useMutation({
    mutationFn: (payload: CreateAccountPayload) =>
      AuthService.createAccount(payload),

    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message || "Account created successfully");
        options?.onSuccess?.();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    },

    onError: (error: TError) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create account";
      toast.error(message);
    },
  });
};
