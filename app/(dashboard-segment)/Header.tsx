'use client'
import { Input } from "@/components/ui/input";
import { LogOut, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    toast.info("Logging out...", {
      description: "We'd love to see you soon!",
    });
    Cookies.remove("role");
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <header className="bg-[#171717] h-[100px] flex items-center justify-between p-5">
      <Link href={"/dashboard"}>
        <Image
          src={"/logo.png"}
          alt="Join logo"
          width={192}
          height={67}
          className="h-8 w-auto"
        />
      </Link>
      <form>
        <div className="relative bg-[#222222] max-w-[240px] rounded-[8px]">
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            <Search size={18} />
          </button>

          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 border-[#222224] bg-[#222222] focus-visible:border-[#222224] h-[43px]"
          />
        </div>
      </form>
      <Popover>
        <PopoverTrigger>
          <Avatar className="w-11 h-11 aspect-square rounded-full cursor-pointer">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-16 mt-1 max-w-[130px]">
          <ul className="flex flex-col gap-5">
            <li>
              <button
                onClick={handleLogout}
                className="flex gap-1 items-center cursor-pointer text-[10px]"
              >
                <LogOut className="rotate-180" size={15} />
                Log Out
              </button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </header>
  );
}
