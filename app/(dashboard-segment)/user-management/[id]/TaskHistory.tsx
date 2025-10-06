import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useIsLargeScreen } from "@/services/hooks/useResponsiveScreen";
import MobileTaskHistory from "./MobileTaskHistory";
import { EmptyState } from "@/components/empty";
import { Spinner } from "@/components/preloader";
import { useAdminFetchUserTaskHistoryById } from "@/services/hooks/useAdminHomeManagement";
import { useState } from "react";
import { PaginationComponent } from "@/components/PaginationComponent";


interface _props {
  // userTasks: IAdminSingleUserTasksResponse[] | undefined,
  id: string,
}

export default function TaskHistory({ id }: _props) {
  const isLarge = useIsLargeScreen();
  console.log("🚀 ~ TaskHistory ~ isLarge:", isLarge)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data: userTasksHistory } = useAdminFetchUserTaskHistoryById(id, page, limit);

  if (!isLarge) {
    return <MobileTaskHistory tasks={userTasksHistory}
      page={page} setPage={setPage}
      limit={limit} setLimit={setLimit}
    />
  }


  return (
    <>
      {userTasksHistory ? userTasksHistory.data.length ?
        <>
          <Table className="min-w-full">
            <TableHeader className="">
              <TableRow className="border-[#232323] hover:bg-transparent ">
                <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Task name</TableHead>
                <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Completion Date</TableHead>
                <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Point Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {userTasksHistory.data.map((task, index) => (
                <TableRow key={index} className="text-white border-[#232323] hover:bg-[#232323]/50 ">
                  <TableCell className="flex items-center gap-2">
                    {task?.task?.title}
                  </TableCell>
                  <TableCell>{new Date(task?.completedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={task?.status == "Approved" || task?.status == "completed" ? "success" : "destructive"}
                    >
                      {task?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent
            page={page}
            totalPages={userTasksHistory.pagination.totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={setLimit}
          // limitOptions={[10, 20, 50, 100]}
          />
        </>
        : <EmptyState title="No tasks found" />
        : <div className='flex items-center justify-center'>
          <Spinner size={64} />
        </div>
      }
    </>
  )
}
