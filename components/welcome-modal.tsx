"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import coins from "@/assets/images/stack-of-coins.webp";
import Image from "next/image";
import Link from "next/link";
import { Discord, Telegram, X } from "./task-svgs";
import { useTutorial } from "@/context/tutorial-context";
import { useRouter } from "next/navigation";
import { useFetchProfile } from "@/services/hooks/useProfile";
import TutorialStep from "./tutorial-step";

export const CancelIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="url(#paint0_linear_1677_5315)"
        strokeWidth="3.07777"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1677_5315"
          x1="5.41667"
          y1="7"
          x2="16.3175"
          y2="8.51401"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8AE6CF" />
          <stop offset="1" stopColor="#7C3AE7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SocialButtons = () => {
  return (
    <div className="flex flex-col xs:flex-row lg:flex-col items-center justify-between lg:items-end gap-[5px] w-full">
      <div className="flex">
        <h3 className="text-sm font-semibold leading-none">
          Follow Us <br />{" "}
          <span className="text-[8px] font-normal">For more updates</span>
        </h3>
      </div>
      <div className="flex gap-[15px] h-8 items-center">
        <Link href={"https://discord.gg/uf2TzvAsJX"} target="_blank">
          <Discord />
        </Link>
        <Link href={"https://t.me/JoinAllinOneEco"} target="_blank">
          <Telegram />
        </Link>
        <Link
          href={"https://x.com/intent/follow?screen_name=joineco"}
          className="scale-90"
          target="_blank"
        >
          <X />
        </Link>
      </div>
    </div>
  );
};

export const WelcomeModal = () => {
  const [isShown, setShown] = useState(true);
  const { startTutorial } = useTutorial();
  const router = useRouter();
  const { data } = useFetchProfile();
  if (!isShown) return null;

  return (
    <TutorialStep
      stepNumber={7}
      description="Nothing to see here."
      title="Nothing to see here."
      position="top-14 right-0 z-50 w-[207px]"
    >
      <div className="flex flex-col bxs:flex-row w-full lg:max-w-full mx-auto lg:mx-0 lg:hidden px-0.5 gap-3">
        <div className="custom-gradient-bg custom-gradient-border py-1.5 px-2 flex flex-1 lg:hidden">
          <SocialButtons />
        </div>
        <div className="flex lg:hidden">
          <Button
            variant={"default-gradient"}
            size={"default-gradient"}
            className="w-full bxs:w-auto lg:px-[31px]"
            onClick={() => router.push("/all-ranks")}
          >
            <Image
              src={coins}
              alt="A stack of coins"
              width={33}
              height={33}
              className="size-6"
            />
            {`${data?.data?.userPoint?.totalPoints || 0}pts`}
          </Button>
        </div>
      </div>
      <div className="relative hidden lg:flex justify-between h-fit min-h-[122px] p-5 rounded-[7.694px] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(98deg,rgba(102,254,203,0.20)_6.1%,rgba(137,64,255,0.20)_103.66%)] shadow-welcome">
        <div className="flex gap-5">
          <Image
            src={coins}
            alt="Stack of coins"
            width={212}
            height={190}
            className="h-full max-h-[95px] w-auto"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[15px]">
              Welcome To The Earn Page
            </h1>
            <p className="text-white/60 text-sm">Let&apos;s earn some coins</p>
            <div className="flex gap-[5px]">
              <Button
                variant={"primary-purple"}
                size="sm"
                className="font-medium text-[10px] min-w-[116px] rounded-[7px]"
                onClick={startTutorial}
              >
                Show me how
              </Button>
              <Button
                variant={"thin-outline-gradient"}
                size="sm"
                className="font-medium text-[10px] min-w-[116px]"
                onClick={() => setShown(false)}
              >
                Skip
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-3">
          <button
            onClick={() => setShown(false)}
            className="cursor-pointer hover:scale-90 active:scale-100 -mt-2.5"
          >
            <CancelIcon />
          </button>
          <SocialButtons />
        </div>
      </div>
    </TutorialStep>
  );
};
