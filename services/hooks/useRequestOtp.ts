import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../endpoints/auth";
import { toast } from "sonner";
import { TError } from "@/types/errorType";

interface Options {
  onSuccess?: () => void;
}

export const useRequestOtp = (options?: Options) => {
  return useMutation({
    mutationFn: (email: string) => AuthService.requestOtp(email),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "OTP sent successfully");
        options?.onSuccess?.();
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    },
    onError: (error: TError) => {
      const message =
        error?.response?.data?.message || error.message || "OTP request failed";
      toast.error(message);
    },
  });
};
