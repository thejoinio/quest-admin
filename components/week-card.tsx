import Image from "next/image";
import { FC } from "react";
import padlockClose from "@/assets/images/padlock.webp";
import padlockOpen from "@/assets/images/padlock-open.webp";
import { DashedGradientLine } from "./task-svgs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface IWeekCard {
  locked: boolean;
  week: number;
  onClickBtn: () => void;
}
export const WeekCard: FC<IWeekCard> = ({ locked = false, week, onClickBtn }) => {
  return (
    <div className={cn("flex", locked && 'opacity-50')}>
      {week > 1 && <DashedGradientLine />}
      <Button variant={"link"}
        onClick={onClickBtn}
        className="w-fit p-0 custom-gradient-bg custom-gradient-border shadow-welcome flex"
        style={{ textDecoration: "none", textUnderlineOffset: 0 }}
      >
        <div className="custom-gradient-bg-solid rounded-l-[7.694px] h-full w-[35px] flex justify-center items-center">
          {locked ? (
            <Image
              src={padlockClose}
              alt="Locked padlock"
              width={133}
              height={199}
              className="h-11 w-auto"
            />
          ) : (
            <Image
              src={padlockOpen}
              alt="Unlocked padlock"
              width={58}
              height={87}
              className="h-11 w-auto"
            />
          )}
        </div>

        <div className="p-2 flex flex-col justify-center items-center text-[#A4CCED] font-semibold text-[15px]">
          <div>Week</div>
          <div>{week}</div>
        </div>
      </Button>
    </div>
  );
};
