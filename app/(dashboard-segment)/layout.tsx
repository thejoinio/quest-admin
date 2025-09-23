"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import SideNav from "./SideNav";
import { useFetchProfile } from "@/services/hooks/useProfile";
import Cookies from "js-cookie";
import { Preloader } from "@/components/preloader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const token = Cookies.get("token");
    const { data, isPending } = useFetchProfile();
    const profileData = data?.data;

    useEffect(() => {
        if (!token) router.push("/");
        if (profileData && profileData?.role != "admin") {
            Cookies.remove("token");
            router.push("/");
        }
    }, [token, profileData?.role, router]);

    if (isPending || !token) return <Preloader />;

    return (
        <div className="bg-[#232323]">
            <Header />
            <div className="flex align-center gap-[10px]">
                <SideNav />
                <main className="pb-20 md:pb-5 p-5 flex-1">{children}</main>
            </div>
        </div>
    )
}