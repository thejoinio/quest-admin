import React, { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useIsLargeScreen } from '@/services/hooks/useResponsiveScreen';
import MobileTopUsers from './MobileTopUsers';
import { EmptyState } from '@/components/empty';
import { Spinner } from '@/components/preloader';
import { useFetchAdminDashboardOverviewLeaderboard } from '@/services/hooks/useAdminHomeManagement';
import { PaginationComponent } from '@/components/PaginationComponent';
import { getAvatarInitials } from '@/lib/resources';


export default function TopUsers() {
  const isLarge = useIsLargeScreen();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data: usersData } = useFetchAdminDashboardOverviewLeaderboard(page, limit);
  console.log("🚀 ~ TopUsers ~ usersData:", usersData)

  if (!isLarge) {
    return <MobileTopUsers
      usersData={usersData}
      page={page} setPage={setPage}
      limit={limit} setLimit={setLimit}
    />
  }

  return (
    <>
      {usersData ? usersData.data.length ? (
        <>
          <Table className="min-w-full">
            <TableHeader className="">
              <TableRow className="border-[#232323] hover:bg-transparent ">
                <TableHead className="text-[rgba(255,255,255,0.4)] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Name</TableHead>
                <TableHead className="text-[rgba(255,255,255,0.4)] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Points</TableHead>
                <TableHead className="text-[rgba(255,255,255,0.4)] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Task Count</TableHead>
                <TableHead className="text-[rgba(255,255,255,0.4)] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Task Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {usersData.data.map((user) => (
                <TableRow key={user.rank} className="text-white border-[#232323] hover:bg-[#232323]/50 ">
                  {/* <TableCell className="font-medium">{user.rank}</TableCell> */}
                  <TableCell className="flex items-center gap-2">
                    {user.rank}

                    {/* {user.trend === "up" && (
                      <span className="text-green-500">▲</span>
                    )} */}

                    <div>
                      <Avatar className="w-[30px] h-[30px] rounded-full">
                        <AvatarImage src={user?.user?.avatar} />
                        <AvatarFallback>{getAvatarInitials(user?.user?.username || "AA")}</AvatarFallback>
                      </Avatar>
                    </div>

                    {user?.user?.username}
                  </TableCell>
                  <TableCell>{user.totalPoints.toLocaleString()}</TableCell>
                  <TableCell>{user.userTaskCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.taskStatus === "complete" ? "success" : "in-progress"
                      }
                    >
                      {user.taskStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent
            page={page}
            totalPages={usersData.pagination.totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={setLimit}
          // limitOptions={[10, 20, 50, 100]}
          />
        </>
      ) : <EmptyState title='No user found.' />
        : <div className='flex items-center justify-center'>
          <Spinner size={64} />
        </div>
      }
    </>
  )
}
