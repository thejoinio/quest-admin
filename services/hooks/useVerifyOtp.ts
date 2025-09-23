import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../endpoints/auth";
import { toast } from "sonner"; 
import { TError } from "@/types/errorType";

interface Options {
  onSuccess?: () => void;
}

export const useVerifyOtp = (options?: Options) => {
  return useMutation({
    mutationFn: (payload: { email: string; otp: string }) =>
      AuthService.verifyOtp(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "OTP verified successfully");
        options?.onSuccess?.();
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    },
    onError: (error: TError) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "OTP verification failed";
      toast.error(message);
    },
  });
};
