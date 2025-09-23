"use client";
import { cn } from "@/lib/utils";
import { TaskCard } from "./task-card";
import { CollapseIcon } from "./task-svgs";
import { useState } from "react";
import { useFetchAllTasks } from "@/services/hooks/useTasks";
import { Spinner } from "./preloader";
import { EmptyState } from "./empty";

export const AllTasksSection = () => {
  const [viewAll, setViewAll] = useState(false);

  const { data: allTasks, // isPending, error 
  } = useFetchAllTasks();

  // console.log(allTasks);


  return (
    <div
      className={cn(
        "custom-gradient-border custom-gradient-bg shadow-welcome flex flex-col gap-3.5 w-full",
        !viewAll && "overflow-hidden"
      )}
    >
      <div className="flex justify-between">
        <h2 className="p-2 gradient-diagonal-border max-w-[130px]">
          All Tasks
        </h2>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-[#A4CCED] text-xs font-semibold underline mt-3 mr-4 cursor-pointer min-h-[31px]"
        >
          {viewAll ? <CollapseIcon /> : "View all"}
        </button>
      </div>
      <div
        className={cn(
          "flex max-w-full pl-3 pb-3 gap-3",
          viewAll && "flex-wrap"
        )}
      >
        {allTasks ?
          allTasks.data.length ?
            allTasks.data.map((task) => (
              <TaskCard
                key={task.id}
                task={task.title}
                size="big"
                icon={task?.metadata?.taskPlatform || ''}
                link={task.metadata.link}
                points={task.pointsReward}
                no_participants={task.ongoingCount}
                max_participants={task.maxParticipants}
                participant_avatar={task.participantProfiles}
                locked={task.isLocked}
                completed={Number(task.ongoingCount) >= Number(task.maxParticipants) ? true : false}
              />
            ))
            : <div className='flex items-center justify-center w-full'>
              <EmptyState title="No tasks found at the moment." />
            </div>
          : <div className='flex items-center justify-center w-full'>
            <Spinner size={64} />
          </div>
        }




        {/* <TaskCard task="Sign Up" size="big" icon="pencil" locked completed />
        <TaskCard
          task="Complete Profile"
          size="big"
          icon="telegram"
          locked
          completed
        />
        <TaskCard
          task="Join Server"
          size="big"
          icon="discord"
          link="http://discord.com/"
        />
        <TaskCard
          task="Instagram Follow"
          size="big"
          icon="instagram"
          link="https://www.instagram.com/"
        />
        <TaskCard
          task="Join Telegram"
          size="big"
          icon="telegram"
          link="https://web.telegram.org/"
        /> */}
      </div>
    </div>
  );
};
