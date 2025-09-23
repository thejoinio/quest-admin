"use client";

import Link from "next/link";
import { TaskCard } from "./task-card";
import { useFetchUserTasks } from "@/services/hooks/useTasks";
import { Spinner } from "./preloader";
import { EmptyState } from "./empty";

export const OngoingTasksSection = () => {

  const {
    data: ongoingTasks,
    // isPending, error
  } = useFetchUserTasks("normal", "ongoing");


  return (
    <div className="custom-gradient-border custom-gradient-bg shadow-welcome flex flex-col gap-3.5 w-full">
      <div className="flex justify-between">
        <h2 className="p-2 gradient-diagonal-border max-w-[180px]">
          Ongoing Tasks
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
          ongoingTasks ?
            ongoingTasks.data.length ?
              ongoingTasks.data.map((task, index) => (
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
              : <EmptyState title="No ongoing tasks found." />
            : <div className='flex items-center justify-center'>
              <Spinner size={64} />
            </div>
        }
      </div>
    </div>
  );
};
