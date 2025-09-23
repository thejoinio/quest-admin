import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { EmptyState } from '@/components/empty';
import { Spinner } from '@/components/preloader';
import { IAdminDashboardOverviewLeaderboard } from '@/services/definitions/adminInterface';
import { PaginationComponent } from '@/components/PaginationComponent';
import { getAvatarInitials } from '@/lib/resources';


interface _props {
  usersData: IAdminDashboardOverviewLeaderboard | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function MobileTopUsers({
  usersData, page, setPage, limit, setLimit
}: _props) {

  return (
    <>
      {usersData ? usersData.data.length ? (
        <>
          <Accordion type="single" collapsible>
            {
              usersData.data.map((user) => (
                <AccordionItem key={user.rank} value={`${user.rank}`} className='bg-[#1E1E1E] rounded-[8px] px-[10px] border-none mb-3' >
                  <div className='grid grid-cols-2 gap-3'>
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        data-slot="accordion-trigger"
                        className={cn(
                          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                          "p-[10px] bg-[#171717] rounded-[8px] my-2 cursor-pointer text-white"
                        )}
                      >

                        <div className="flex items-center gap-2">
                          {user.rank}
                          <div>
                            <Avatar className="w-[30px] h-[30px] rounded-full">
                              <AvatarImage src={user?.user?.avatar} />
                              <AvatarFallback>{getAvatarInitials(user?.user?.username || "AA")}</AvatarFallback>
                            </Avatar>
                          </div>

                          {user?.user?.username}
                        </div>

                        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <div className='place-self-center justify-self-end'>
                      <Badge
                        variant={user.taskStatus == "complete" ? "success" : "in-progress"}
                      >
                        {user.taskStatus}
                      </Badge>
                    </div>
                  </div>

                  <AccordionContent>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                        <p className='text-[#ffffff7a] text-[14px] font-normal'>Task Count</p>

                        <h4 className='text-white text-[14px] font-normal'>{user.userTaskCount}</h4>
                      </div>

                      <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                        <p className='text-[#ffffff7a] text-[14px] font-normal'>Points</p>

                        <h4 className='text-white text-[14px] font-normal'>{user.totalPoints}</h4>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            }

          </Accordion>

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
