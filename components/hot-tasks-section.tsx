"use client";
import { TaskCard } from "./task-card";
import { useState } from "react";
import { CollapseIcon } from "./task-svgs";
import { cn } from "@/lib/utils";
import { useFetchUserTasks } from "@/services/hooks/useTasks";
import { Spinner } from "./preloader";
import { EmptyState } from "./empty";

export const HotTasksSection = () => {
  const [viewAll, setViewAll] = useState(false);

  const {
    data: hotTasks,
    // isPending, error
  } = useFetchUserTasks("hot", undefined);


  return (
    <div className={cn("custom-gradient-border custom-gradient-bg shadow-welcome flex flex-col gap-3.5 w-full", !viewAll && 'overflow-hidden')}>
      <div className="flex justify-between">
        <h2 className="p-2 gradient-diagonal-border max-w-[130px]">
          Hot Tasks
        </h2>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-[#A4CCED] text-xs font-semibold underline mt-3 mr-4 cursor-pointer min-h-[31px]"
        >
          {viewAll ? <CollapseIcon /> : "View all"}
        </button>
      </div>
      <div className={cn("flex max-w-full pl-3 pb-3 gap-3", viewAll && 'flex-wrap')}>

        {
          hotTasks ?
            hotTasks.data.length ? hotTasks.data.map((task, index) => (
              <TaskCard
                key={index}
                task={task?.title}
                size="big"
                icon={task?.metadata?.taskPlatform || ''}
                link={task?.metadata?.link}
                points={task?.pointsReward}
                // no_participants={20}
                no_participants={task?.ongoingCount}
                max_participants={task?.maxParticipants}
                participant_avatar={task?.participantProfiles}
                locked={task?.isLocked}
                completed={Number(task?.ongoingCount) >= Number(task?.maxParticipants) ? true : false}
              />
            ))
              : <div className='flex items-center justify-center w-full'>
                <EmptyState title="No hot tasks available at the moment." />
              </div>
            : <div className='flex items-center justify-center w-full'>
              <Spinner size={64} />
            </div>
        }

      </div>
    </div>
  );
};
