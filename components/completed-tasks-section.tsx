"use client";

import Link from "next/link";
import { TaskCard } from "./task-card";
import { useFetchUserTasks } from "@/services/hooks/useTasks";
import { Spinner } from "./preloader";
import { EmptyState } from "./empty";

export const CompletedTasksSection = () => {
  const {
    data: completedTasks,
    // isPending, error
  } = useFetchUserTasks("normal", "completed");

  return (
    <div className="custom-gradient-border custom-gradient-bg shadow-welcome flex flex-col gap-3.5 w-full">
      <div className="flex justify-between">
        <h2 className="p-2 gradient-diagonal-border max-w-[250px]">
          Completed Tasks
        </h2>
        <Link
          href={"/all-hot-tasks"}
          className="text-[#A4CCED] text-xs font-semibold underline mt-3 mr-4"
        >
          View all
        </Link>
      </div>
      <div className="flex flex-wrap max-w-full px-3 pb-3 gap-3">
        {
          completedTasks ?
            completedTasks.data.length ? completedTasks.data.map((task, index) => (
              <TaskCard
                key={index}
                task={task.title}
                size="big"
                icon="discord"
                // link="http://discord.com/"
                link={task.metadata.link}
                points={task.pointsReward}
                // no_participants={20}
                no_participants={task.ongoingCount}
                max_participants={task.maxParticipants}
                participant_avatar={task.participantProfiles}
                locked={task.isLocked}
                completed={Number(task.ongoingCount) >= Number(task.maxParticipants) ? true : false}
              />
            ))
              : <EmptyState title="No completed tasks found." />
            : <div className='flex items-center justify-center'>
              <Spinner size={64} />
            </div>
        }


        {/* <TaskCard task="Join Server" size="big" icon="discord" link="http://discord.com/" />
        <TaskCard task="Instagram Follow" size="big" icon="instagram" link="https://www.instagram.com/" />
        <TaskCard task="Twitter Follow" size="big" icon="x" link="https://x.com/" />
        <TaskCard task="Join Telegram" size="big" icon="telegram" link="https://web.telegram.org/" />
        <TaskCard task="Join Telegram" size="big" icon="telegram" link="https://web.telegram.org/" /> */}
      </div>
    </div>
  );
};
