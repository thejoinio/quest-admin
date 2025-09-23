"use client";
import air from "@/assets/gifs/air.gif";
import earth from "@/assets/gifs/earth.gif";
import fire from "@/assets/gifs/fire.gif";
import ice from "@/assets/gifs/ice.gif";
import lightning from "@/assets/gifs/lightning.gif";
import spirit from "@/assets/gifs/spirit.gif";
import water from "@/assets/gifs/water.gif";
import metal from "@/assets/gifs/metal.gif";
import padlock from "@/assets/images/padlock.webp";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { getSingleRank } from "./ranks";
import Modal from "./modal";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import { displayPointCount } from "@/lib/resources";
import ShareModal from "./share-modal";

interface IRankCardProps {
  name: string;
  difficulty: string;
  points: number;
  locked?: boolean;
  referralLink?: string;
  className?: string;
  small?: boolean;
  role?: "regular" | "ambassador" | "kol" | "admin";
}

export const nameImageMap: {
  AIR: StaticImageData;
  EARTH: StaticImageData;
  FIRE: StaticImageData;
  ICE: StaticImageData;
  LIGHTNING: StaticImageData;
  SPIRIT: StaticImageData;
  METAL: StaticImageData;
  WATER: StaticImageData;
} = {
  AIR: air,
  EARTH: earth,
  FIRE: fire,
  ICE: ice,
  LIGHTNING: lightning,
  WATER: water,
  SPIRIT: spirit,
  METAL: metal,
};

export const RankCard = ({
  name,
  difficulty,
  points = 0,
  locked = false,
  referralLink,
  className = "w-fit",
  small = true,
  role = "regular",
}: IRankCardProps) => {
  const rankImage = nameImageMap[name as keyof typeof nameImageMap] || "none";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    if (!referralLink) {
      toast.error("No referral link available.");
      return;
    }
    toast.success("Referral link copied to clipboard!");
    navigator.clipboard.writeText(referralLink);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Quest — Invite",
          text: "Join me on Join Quest using my referral link!",
          url: referralLink,
        });
        return;
      } catch (err) {
        console.log(err);
        toast.error("Could not share referral link");
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  return (
    <>
      <div
        className={cn(
          `custom-gradient-border rounded-[8.348px] shadow-card min-w-[244px] overflow-hidden pb-5 px-[15px] relative`,
          locked && "opacity-50",
          className
        )}
      >
        {locked && (
          <Image
            src={padlock}
            alt="Padlock"
            width={133}
            height={199}
            className="max-w-[66px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          />
        )}
        <div
          style={{ backgroundImage: `url('${rankImage.src}')` }}
          className={`${referralLink ? "w-[227px] h-[227px]" : "w-[208px] h-[208px]"
            } flex flex-col bg-contain relative mx-auto lg:mx-0`}
        >
          <div className="bg-primary-purple/50 blur-[41px] w-[158px] h-[158px] absolute bottom-0 left-1/2 -translate-x-1/2 -z-10" />
          <div
            className={`bg-[linear-gradient(98deg,rgba(102,254,203,0.20)_6.1%,rgba(137,64,255,0.20)_103.66%)] ${referralLink ? "h-10 w-[185px]" : "h-[37px] w-[170px]"
              } rounded-b-[15px] mx-auto text-center`}
          >
            {referralLink && (
              <button
                onClick={handleOpenModal}
                className="cursor-pointer underline text-white/80 text-[13px] active:text-primary-purple"
              >
                Copy referral link
              </button>
            )}
          </div>
          <div className="text-[13px] text-center font-semibold bg-primary-purple w-[130px] h-6 rounded-[8px] flex items-center justify-center -mt-2 mx-auto">
            {name}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col w-fit bg-cover mx-auto",
            // Check for the ambassador role first
            (role === "ambassador" || role === "kol") &&
            (small
              ? "min-w-[218px] h-[93px] bg-[url('/card-footer-amb-sm.svg')]"
              : "min-w-[238px] h-[101px] bg-[url('/card-footer-amb-bg.svg')]"),
            // If not an ambassador, use the original logic
            (role === "regular") &&
            (small
              ? "min-w-[217px] h-[92px] bg-[url('/card-footer-sm.svg')]"
              : "min-w-[235px] h-[100px] bg-[url('/card-footer-bg.svg')]")
          )}
        >
          <div className="bg-[url('/pts-bg.svg')] w-[98.923px] h-[57.601px] mx-auto flex items-center justify-center -mt-4 z-20 text-[15px]">
            {displayPointCount(points)}pts
          </div>
          <div className="text-center mt-auto flex justify-center text-[10px] pb-1">
            {difficulty}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col sm:flex-row w-full">
          <div className="flex w-full sm:w-1/2 justify-center items-center py-5 sm:py-[54px] border-b sm:border-b-0 sm:border-r border-[#8AE5CF]">
            <RankCard
              points={points}
              name={getSingleRank(points)?.name || ""}
              difficulty={getSingleRank(points)?.difficulty || ""}
              className="sm:scale-75 md:scale-100"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start justify-center sm:justify-start w-full sm:w-1/2 h-full py-5 md:py-[30px] pl-[30px] gap-[24px]">
            <h2 className="text-xl font-semibold">Invite and Earn</h2>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <div className="bg-white rounded-[4px]">
                {referralLink && (
                  <div
                    style={{
                      height: "auto",
                      maxWidth: 150,
                      width: "100%",
                      padding: 10,
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={referralLink}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleCopyLink}
                className="flex gap-1 text-white/70 text-left text-[8px] font-normal cursor-pointer"
              >
                {referralLink} <Copy size={12} color="white" />
              </button>
              <Button
                onClick={handleShare}
                variant={"thin-outline-gradient"}
                className="h-[30px] text-[10px] cursor-pointer"
              >
                Share Referral Link
              </Button>
              <ShareModal
                isOpen={isShareModalOpen}
                onClose={handleCloseShareModal}
                referralLink={referralLink}
              />
            </div>
            <div className="flex flex-col gap-[5px] text-center sm:text-left">
              <h4 className="text-white/70 text-xs">
                Successful Referral{" "}
                <span className="text-[#E0A326] font-semibold">+50pts</span>
              </h4>
              <p className="text-white/70 text-xs">
                Referred User Completes 3 Tasks{" "}
                <span className="text-[#E0A326] font-semibold">
                  +30 pts Extra
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
