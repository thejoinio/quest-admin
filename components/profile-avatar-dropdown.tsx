'use client'

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUserRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const ProfileAvatarDropdown = ({ big = true }: { big?: boolean }) => {
  const router = useRouter();

  const handleLogout = () => {
    toast.info("Logging out...", {
      description: "We'd love to see you soon!",
    });
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={`${big ? "size-11" : "size-[30px]"} aspect-square rounded-full cursor-pointer`}>
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-8 lg:mr-16 mb-4 lg:mb-0 lg:mt-1 max-w-[130px]">
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              href="/profile"
              className="flex gap-1 items-center text-[10px]"
            >
              <CircleUserRound size={15} />
              View Profile
            </Link>
          </li>
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
  )
}