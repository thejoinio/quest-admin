"use client";

import Link from "next/link";
import { TaskCard } from "./task-card";
import { useFetchUserTasks } from "@/services/hooks/useTasks";
import { Spinner } from "./preloader";
import { EmptyState } from "./empty";

export const SidebarTaskContainer = ({
  type,
}: {
  type: "/ongoing-tasks" | "/completed-tasks";
}) => {

  const {
    data: ongoingTasks,
  } = useFetchUserTasks("normal", type.includes("ongoing") ? "ongoing" : "completed");

  return (
    <div className="flex flex-col gap-3.5 custom-gradient-border shadow-welcome rounded-[8.348px] p-3">
      <div className="flex justify-between font-semibold">
        <p className="text-[11.687px] font-semibold text-white/70">
          {type === "/ongoing-tasks" ? "Ongoing Tasks" : "Completed Tasks"}
        </p>
        <Link href={type} className="underline text-primary-blue text-[10px]">
          View All
        </Link>
      </div>
      <div className="flex space-x-2.5 overflow-hidden">
        {
          ongoingTasks ?
            ongoingTasks.data.length ? ongoingTasks.data.slice(0, 3).map((task, index) => (
              <TaskCard
                key={index}
                task={task.title}
                size="small"
                icon="discord"
                link={task.metadata.link}
                points={task.pointsReward}
                no_participants={task.ongoingCount}
                max_participants={task.maxParticipants}
                participant_avatar={task.participantProfiles}
                locked={task.isLocked}
                completed={Number(task.ongoingCount) >= Number(task.maxParticipants)}
              />
            ))
              : <EmptyState title={`You don't have any ${type.includes("ongoing") ? "ongoing" : "completed"} task yet.`} showDescription={false} />
            : <div className='flex items-center justify-center w-full'>
              <Spinner size={64} />
            </div>
        }

      </div>
    </div>
  );
};
