"use client";
import { useAuthRedirect } from "@/constants/useAuthRedirect";
import { globalEmitter } from "@/services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            return false;
          }

          return failureCount < 3;
        },
      },
      mutations: {
        retry: (failureCount, error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            return false;
          }
          return failureCount < 3;
        },
      },
    },
  });

  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsUnauthorized(true);
      toast.info("Session expired or Unauthorized!", {
        description: "You are being redirected to login...",
      });
    };

    globalEmitter.on("unauthorized", handleUnauthorized);

    return () => {
      globalEmitter.off("unauthorized", handleUnauthorized);
    };
  }, []);

  useAuthRedirect(isUnauthorized);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
