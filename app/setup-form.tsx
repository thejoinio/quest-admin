"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { toast } from "sonner";
import { useLogin } from "@/services/hooks/useLogin";
import {
  useEncryptionPublicKey,
  usePasswordEncryptor,
} from "@/services/hooks/useEncryption";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// read once at module scope
const DISABLE_SECURITY =
  process.env.NEXT_PUBLIC_DISABLE_SECURITY_FEATURES === "true";

export function SetupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    encryptPassword,
    loading: loadingPasswordEncryptor,
  } = usePasswordEncryptor();
  const {data: encryptionKey, isPending: isGettingPK } = useEncryptionPublicKey();
  const {
    isLoading: isLoadingFPJS,
    error: errorFPJS,
    data,
    getData,
  } = useVisitorData(
    { extendedResult: true },
    { immediate: !DISABLE_SECURITY }
  );
  const reloadData = () => {
    if (!DISABLE_SECURITY) getData({ ignoreCache: true });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      const token = data.data?.token;
      const role = data.data?.role;
      form.reset();
      if (token) {
        Cookies.set("token", token, {
          secure: true,
          sameSite: "Strict",
        });
        if (role) Cookies.set("role", role);
        router.push("/dashboard");
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (loadingPasswordEncryptor) {
      toast.info("Security measures is being activated...", {
        description:
          "Thanks for your patience while we activate our security measures.",
      });
      return;
    }
    if (errorFPJS) {
      toast.error("Security check failed!", { description: errorFPJS.message });
      return;
    }
    try {
      if (!encryptionKey?.data?.sessionId || !encryptionKey?.data?.publicKey) {
        toast.error("Error activating security measures!", {
          description:
            "An error occurred while activating our security measures, try again later.",
        });
        return;
      }
      const encryptedPassword = await encryptPassword(
        values.password,
        encryptionKey.data.publicKey
      );
    login({
      email: values.email,
      encryptedPassword: encryptedPassword,
      sessionId: encryptionKey.data.sessionId,
      fingerprintData: DISABLE_SECURITY
        ? { visitorId: "test-visitor-id", requestId: "test-request-id" }
        : data,
    });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred while logging you in.", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g yourmail@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">

          {!DISABLE_SECURITY && errorFPJS && (
            <div className="flex items-center gap-2 text-red-500 text-sm mb-2">
              <AlertCircle size={16} />
              <span>{errorFPJS.message}</span>
              <button onClick={reloadData} type="button" className="underline">
                Try again
              </button>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            isPending || (!DISABLE_SECURITY && isLoadingFPJS) || isGettingPK
          }
          data-testid="login-button"
        >
          {!DISABLE_SECURITY && isLoadingFPJS || isGettingPK || loadingPasswordEncryptor
            ? "Running security checks..."
            : isPending
              ? "Logging in..."
              : "Log In"}
        </Button>
      </form>
    </Form>
  );
}
