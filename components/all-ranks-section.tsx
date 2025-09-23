"use client";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { RankCard } from "./rank-card";
import { getDynamicRanks } from "./ranks";
import { useFetchProfile } from "@/services/hooks/useProfile";
import { SectionLoader } from "./preloader";

type IRank = {
  name: string;
  difficulty: string;
  min_points: number;
  max_points: number;
  unlocked: boolean;
};

export const AllRanksSection = () => {
  const { data, isFetching, error } = useFetchProfile();
  if (error) return <div>{error.message}</div>;
  if (isFetching)
    return (
      <div className="flex flex-1 h-full w-full">
        <SectionLoader />
      </div>
    );

  function getValidUserPoint(userPoint: number, rank: IRank): number {
    if (userPoint >= rank.min_points && userPoint <= rank.max_points) {
      // If inside the range, return userPoint
      return userPoint;
    }
    if (userPoint < rank.min_points) {
      // If userPoint is below this rank's range, clamp to the last max
      return rank.max_points;
    }

    // Default (shouldn’t hit because SPIRIT has Infinity max_points)
    return rank.max_points;
  }

  return (
    <div className={cn("flex flex-col gap-3.5 w-full")}>
      <BackButton />
      <div className="flex flex-wrap gap-4 justify-around">
        {getDynamicRanks(data?.data.userPoint?.totalPoints || 0).map(
          (rank, idx) => (
            <RankCard
              key={idx}
              {...rank}
              points={getValidUserPoint(
                data?.data.userPoint?.totalPoints || 0,
                rank
              )}
              className="w-[222px]"
            />
          )
        )}
      </div>
    </div>
  );
};
