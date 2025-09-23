import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import coins from "@/assets/icons/coins.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TaskIcon } from "./task-icons";
import { ITaskParticipant } from "@/services/definitions/tasks";
import Modal from "./modal";
import { useState } from "react";

interface ITaskCardProps {
  size?: "small" | "medium" | "big";
  task: string;
  icon: string;
  locked?: boolean;
  completed?: boolean;
  link?: string;
  points?: string | number;
  // participant_avatar?: string[];
  participant_avatar?: ITaskParticipant[];
  no_participants?: number;
  max_participants?: number;
}
export const TaskCard = ({
  size = "big",
  task,
  icon,
  locked = false,
  completed = false,
  link,
  points,
  participant_avatar = [],
  no_participants = 20,
  max_participants = 100,
}: ITaskCardProps) => {
  const [isModalOpen, setOpenModal] = useState(false);
  const avatars = ["/avatar-1.png", "/avatar-2.png", "/avatar-3.png"];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

  const handleClose = () => {
    setOpenModal(!isModalOpen)
  }

  return (
    <div
      className={cn(
        "custom-gradient-border custom-gradient-bg rounded-[7.694px] shadow-welcome",
        size === "small" && "w-[83px]",
        size === "big" && "w-full min-w-[170px] max-w-[170px]",
        locked && "opacity-50"
      )}
    >
      {link && !completed ? (
        <button onClick={handleClose}
          className={cn(
            "rounded-t-[7.694px] bg-primary-purple w-full flex items-center justify-center",
            size === "small" && "h-[45px]",
            size === "big" && "h-[105px]"
          )}
        >
          <TaskIcon name={icon} />
        </button>
      ) : (
        <button onClick={handleClose}
          className={cn(
            "rounded-t-[7.694px] bg-primary-purple w-full flex items-center justify-center",
            size === "small" && "h-[45px]",
            size === "big" && "h-[105px]"
          )}
        >
          <TaskIcon name={icon} />
        </button>
      )}
      <div
        className={cn(
          "w-full",
          size === "small" && "h-[27px]",
          size === "big" &&
          "h-[82.33px] flex flex-col justify-between pt-3.5 pb-3 px-2"
        )}
      >
        <div className="flex">
          <div
            className={cn(
              "w-full",
              size === "small" && "text-[8.348px] text-white/70 py-[3px] px-1",
              size === "big" && "flex text-xs font-semibold"
            )}
          >
            {task}
          </div>
          {size === "big" && (
            <Button
              disabled={locked}
              size={"xs"}
              onClick={handleClose}
              variant={completed ? "success" : "primary-bordered"}
            >
              {completed ? "Completed" : "Claim"}
            </Button>
          )}
        </div>
        {size === "big" && (
          <div className="flex justify-between">
            {points &&
              <div className="flex items-center text-[9.233px] -mb-1">
                <Image
                  src={coins}
                  alt="A stack of coins"
                  width={33}
                  height={33}
                  className="size-6"
                />
                {points} pts
              </div>
            }
            <div className="flex ml-auto items-end text-[7.694px] gap-0.5">
              <div className="flex -space-x-1.5">
                {/* ["/avatar-1.png", "/avatar-2.png", "/avatar-3.png"] */}
                {
                  participant_avatar.map((item, index) => (
                    <Avatar key={index} className={`z-${30 - (index * 10)}`}>
                      <AvatarImage src={item.avatar || randomAvatar} />
                      <AvatarFallback>{item.username}</AvatarFallback>
                    </Avatar>
                  ))
                }
              </div>
              <div>{no_participants}/{max_participants}</div>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="flex flex-col items-center py-16 px-4">
          <h4 className="text-3xl py-2 sm:text-4xl md:text-5xl font-bold bg-clip-text bg-gradient-to-br from-[#8AE5CF] from-[8.2%] to-[#7C3AE7] to-[94.29%] text-transparent">
            Coming Soon
          </h4>
          <div className="text-lg font-medium my-5 text-center">We are currently working on this feature, please check back soon!</div>
        </div>
      </Modal>
    </div>
  );
};
