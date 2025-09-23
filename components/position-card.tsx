import Image from "next/image";
import { FC } from "react";
import coins from "@/assets/icons/coins.svg";

interface IPositionCard {
  username: string;
  avatar: string;
  position: string;
  points: number;
}

export const FirstPositionCard: FC<IPositionCard> = ({ ...d }) => {
  return (
    <div className="flex flex-col gap-1.5 md:gap-3.5 items-center justify-end">
      <Image src={"/avatar.png"} alt={d.username} width={89} height={89} className="mt-auto size-11 md:size-[89px]" />
      <div className="text-[9px] md:text-base mt-auto">@{d.username || "User"}</div>
      <div className="relative min-w-[96px] md:min-w-[223px] min-h-[105px] md:min-h-[144px] flex flex-col">
        <div className="custom-gradient-bg-light custom-gradient-border rounded-[6.699px] md:rounded-[9.201px] w-fit self-center mt-3.5 md:mt-5 h-6 md:h-11 px-0.5 pr-1 md:px-3 text-[9px] md:text-xs flex items-center text-[#A4CCED] font-semibold">
          <Image
            src={coins}
            alt="A stack of coins"
            width={33}
            height={33}
            className="size-4 md:size-8 md:-ml-1"
          />{" "}
          {d.points}pts
        </div>
        <div className="position-text font-black text-[21px] md:text-[30px] text-center">
            {d.position}
        </div>
        <Image
            src={"/position-bg.svg"}
            alt=""
            width={223}
            height={144}
            className="absolute inset-0 hidden md:flex"
          />
          <Image
            src={"/position-bg-mobile.svg"}
            alt=""
            width={96}
            height={105}
            className="absolute inset-0 md:hidden"
          />
      </div>
    </div>
  );
};

export const PositionCard: FC<IPositionCard> = ({ ...d }) => {
  return (
    <div className="flex flex-col gap-1.5 md:gap-3.5 items-center justify-end">
      <Image src={"/avatar.png"} alt={d.username} width={89} height={89} className="size-11 md:size-[89px]" />
      <div className="text-[9px] md:text-base h-fit">@{d.username || "User"}</div>
      <div className="relative min-w-[96px] md:min-w-[183px] min-h-[65px] md:min-h-[118px] flex flex-col">
        <div className="custom-gradient-bg-light custom-gradient-border rounded-[6.699px] md:rounded-[9.201px] w-fit self-center mt-2 md:mt-5 h-6 md:h-11 px-0.5 pr-1 md:px-3 text-[9px] md:text-xs flex items-center text-[#A4CCED] font-semibold">
          <Image
            src={coins}
            alt="A stack of coins"
            width={33}
            height={33}
            className="size-4 md:size-8 md:-ml-1"
          />{" "}
          {d.points}pts
        </div>
        <div className="position-text font-black text-[21px] md:text-[30px] text-center">
            {d.position}
        </div>
          <Image
          src={"/position-bg-small.svg"}
          alt=""
          width={183}
          height={118}
          className="absolute inset-0 hidden md:flex mt-auto"
        />
        <Image
          src={"/position-bg-small-mobile.svg"}
          alt=""
          width={96}
          height={65}
          className="absolute inset-0 md:hidden"
        />
      </div>
    </div>
  );
};
