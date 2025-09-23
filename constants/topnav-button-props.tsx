import Image from "next/image";
import coins from "@/assets/icons/coins.svg";
import { Button } from "@/components/ui/button";
import { useFetchProfile } from "@/services/hooks/useProfile";
import { useRouter } from "next/navigation";
import { LeaderboardIcon, ReferralIcon } from "@/components/task-svgs";
import TutorialStep from "@/components/tutorial-step";

export const TopNavButtons = () => {
  const router = useRouter();
  const { data } = useFetchProfile();

  const profileData = data?.data;
  // console.log("profileData", profileData)
  const buttonsProps = [
    {
      name: "Referrals",
      icon: <ReferralIcon />,
      link: "/referrals",
    },
    {
      name: "Leaderboard",
      icon: <LeaderboardIcon />,
      link: "/leaderboard",
    },
    // {
    //   name: `${profileData?.userPoint?.totalPoints || 0}`,
    //   icon: <LeaderboardIcon />,
    //   link: "/all-ranks",
    // },
    {
      name: `${profileData?.userPoint?.totalPoints || 0}pts`,
      icon: (
        <Image
          src={coins}
          alt="A stack of coins"
          width={33}
          height={33}
          className="size-6"
        />
      ),
      link: "/all-ranks",
    },
  ];

  return buttonsProps.map((btn, index) => (
    <li key={index}>
      <TutorialStep
        stepNumber={index === 3 ? 3 : 8}
        description="See points accumulated and your position on the leaderboard."
        title="Reward Zone Tab"
        position="top-14 right-0 z-50 w-[207px]"
      >
        <Button
          variant={"default-gradient"}
          size={"default-gradient"}
          className="lg:px-[31px]"
          onClick={() => router.push(btn.link)}
        >
          {btn.icon} {btn.name}
        </Button>
      </TutorialStep>
    </li>
  ));
};
