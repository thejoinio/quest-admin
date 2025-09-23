'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { WeekCard } from "./week-card";
import farmer from "@/assets/images/a-farmer.webp";
import { Button } from "./ui/button";
import TutorialStep from "./tutorial-step";
import { cn } from "@/lib/utils";
import { useClaimFarming, useFetchFarmingStatus, useStartFarming } from "@/services/hooks/useFarming";
import { useCurrentWeekStatus } from "@/services/hooks/useWeekMgt";
import { useFetchProfile } from "@/services/hooks/useProfile";

export const WeeksSection = () => {
  const { mutate: startFarming, isPending: isStarting } = useStartFarming();
  const {data: userProfileData} = useFetchProfile();
  const { data: currentWeek } = useCurrentWeekStatus();
  const { data: farmingStatus, isLoading: isFarmingLoadingStatus, refetch: refetchFarmingStatus } = useFetchFarmingStatus();
  const { mutate: claimFarming, isPending: isClaiming } = useClaimFarming();

  const [time, setTime] = useState<string | null>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (farmingStatus?.data?.claimAvailable) {
        function getCountdown(targetDate: string): string | null {
          const target = new Date(targetDate).getTime();
          const now = new Date().getTime();
          const diff = target - now;

          // If the countdown is over
          if (diff <= 0) {
            refetchFarmingStatus();
            clearInterval(interval);
            return null;
          }

          // Calculate hours, minutes, seconds
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          // Format with leading zeros
          const pad = (n: number) => n.toString().padStart(2, "0");
          return `${hours}hrs : ${pad(minutes)}mins : ${pad(seconds)}secs`;
        }

        setTime(getCountdown(farmingStatus?.data?.claimAvailable || ''));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [farmingStatus?.data?.claimAvailable, refetchFarmingStatus]);

  // handles the active state of Farm and Claim button
  const handleDisableBtn = (btnType: "Farm" | "Claim") => {
    if (!farmingStatus || isStarting || isClaiming || isFarmingLoadingStatus) {
      return true; // disable the button
    } else {
      switch (btnType) {
        case "Farm":
          return farmingStatus.data.active || farmingStatus.data.canClaim;
        case "Claim":
          return farmingStatus.data.active || !farmingStatus.data.canClaim;
        default:
          return false;
          break;
      }
    }

  }

  // handles the text displayed at the top of the buttons
  const handleDisplayFarmingTitle = () => {
    // display claim text 
    if (farmingStatus && farmingStatus.data.canClaim) {
      return userProfileData?.data.role === "regular" ? "Claim your 100 points": "Claim your 200 points";
    }

    // display the timer count if farming is active
    if (farmingStatus && farmingStatus.data.active) {
      return time || "Farming in Progress...";
    }

    return "Start Farming";
  }

  // handles the active state of weeks
  const handleIsActive = (week: number) => {
    return currentWeek && currentWeek?.data.weekNumber >= week ? false : true;
  }

  return (
    <div className={cn("flex flex-1 flex-col-reverse xl:flex-row gap-[30px]")}>
      <TutorialStep
        stepNumber={5}
        description="Get access to new task every week. Exciting right!"
        title="Weekly Focus Tab"
        position="-top-[150px] left-1/2 -translate-x-1/2 z-50 w-[207px]"
        className="flex-1 w-full"
      >
        <div className="custom-gradient-border custom-gradient-bg md:px-[26px] shadow-welcome flex w-full">
          <div className="flex p-3.5 overflow-x-auto mx-auto">
            <WeekCard locked={handleIsActive(1)} week={1} onClickBtn={() => { }} />
            <WeekCard locked={handleIsActive(2)} week={2} onClickBtn={() => { }} />
            <WeekCard locked={handleIsActive(3)} week={3} onClickBtn={() => { }} />
            <WeekCard locked={handleIsActive(4)} week={4} onClickBtn={() => { }} />
          </div>
        </div>
      </TutorialStep>

      <TutorialStep
        stepNumber={4}
        description="See points accumulated and your position on the leaderboard."
        title="Reward Zone Tab"
        position="-top-[160px] right-1/2 translate-x-1/2 z-50 w-[207px]"
      >
        <div className="custom-gradient-border custom-gradient-bg px-3 shadow-welcome max-h-24 xl:max-h-[89px] flex justify-between gap-4 h-[96px] xl:h-auto xl:min-h-auto">
          <div className="flex justify-center items-center min-w-16">
            <Image
              src={farmer}
              alt="A farmer with a fork and coins"
              className="h-[78px] w-auto"
            />
          </div>
          <div className="flex flex-col justify-around items-end py-2">
            <div className="text-sm font-semibold whitespace-nowrap">{handleDisplayFarmingTitle()}</div>
            <div className="flex gap-2.5">
              <Button
                className="h-8 max-w-[72px]"
                variant={"primary-purple-3d"}
                disabled={handleDisableBtn("Farm")}
                onClick={() => startFarming()}
              >
                Farm
              </Button>

              <Button className="h-8 max-w-[72px]" variant={"yellow-3d"}
                disabled={handleDisableBtn("Claim")}
                onClick={() => claimFarming()}
              >
                Claim
              </Button>
            </div>
          </div>
        </div>
      </TutorialStep>
    </div>
  );
};
