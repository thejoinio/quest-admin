"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUserRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { TopNavButtons } from "@/constants/topnav-button-props";
import TutorialStep from "./tutorial-step";
import { useFetchProfile } from "@/services/hooks/useProfile";
import { avatarData } from "@/components/avatars";



export const TopNav = () => {
  const router = useRouter();
  const { data: userProfile } = useFetchProfile();

  const handleLogout = () => {
    toast.info("Logging out...", {
      description: "We'd love to see you soon!",
    });
    Cookies.remove("token");
    router.push("/");
  };

  const handleGetAvatar = () => {
    const hello = avatarData.find((item) => item.name == userProfile?.data.avatar);
    if (!hello) return "/avatar.png";
    // Type guard: check if image has src property
    return typeof hello.image === "string"
      ? hello.image
      : (hello.image as { src: string }).src;
  }

  return (
    <nav className="hidden lg:flex justify-between items-center pt-7 pb-5">
      <TutorialStep
        stepNumber={8}
        description="Nothing to see here."
        title="Nothing to see here"
        position="top-0 left-full z-50 w-[207px]"
      >
        <Link href={"/dashboard"}>
          <Image
            src={"/logo.png"}
            alt="Join logo"
            width={192}
            height={67}
            className="h-8 w-auto"
          />
        </Link>
      </TutorialStep>
      <div className="flex gap-4 lg:gap-6 items-center font-(family-name:--font-tsb)">
        <ul className="flex gap-4 lg:gap-6 items-center">
          <TopNavButtons />
        </ul>

        <TutorialStep
          stepNumber={3}
          description="View your account information and make edits."
          title="Profile Tab"
          position="top-14 right-0 z-50 w-[207px]"
        >

          <Popover>
            <PopoverTrigger>
              <Avatar className="w-11 h-11 aspect-square rounded-full cursor-pointer">
                <AvatarImage
                  src={`${handleGetAvatar()}`}
                />
                <AvatarFallback>{userProfile?.data.username}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="mr-16 mt-1 max-w-[130px]">
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
        </TutorialStep>
      </div>
    </nav>
  );
};
