"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Cookies from "js-cookie";

export const useAuthRedirect = (isUnauthorized: boolean) => {
  const router = useRouter();
  // const role = Cookies.get("role");

  useEffect(() => {
    if (isUnauthorized) {
      router.push("/");
    }
  }, [isUnauthorized, router]);
};
