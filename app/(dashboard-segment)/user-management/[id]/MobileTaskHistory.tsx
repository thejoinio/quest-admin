import React, { Dispatch, SetStateAction } from 'react'

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  Accordion,
  // AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { IAdminFetchUserTaskHistory } from '@/services/definitions/adminInterface';
import { EmptyState } from '@/components/empty';
import { Spinner } from '@/components/preloader';
import { PaginationComponent } from '@/components/PaginationComponent';


interface _props {
  // tasks: IAdminSingleUserTasksResponse[] | undefined,
  tasks: IAdminFetchUserTaskHistory | undefined,

  page: number, setPage: Dispatch<SetStateAction<number>>,
  limit: number, setLimit: Dispatch<SetStateAction<number>>,

}

export default function MobileTaskHistory({ tasks, page, setPage, limit, setLimit }: _props) {


  return (
    <div>
      <div className='grid grid-cols-2 gap-3 bg-[#171717] p-2 rounded-[8px] mb-3 text-white/40 text-[14px]'>
        <div>
          <p>Task name</p>
          <p>Completion Date</p>
        </div>

        <p className='place-self-center justify-self-end'>Point Status</p>
      </div>

      {tasks ? tasks.data.length ?
        <>
          <Accordion type="single" collapsible>
            {
              tasks.data.map((task, index) => (
                <AccordionItem key={index} value={`${index}`} className='bg-[#1E1E1E] rounded-[8px] px-[10px] border-none mb-3' >
                  <div className='grid grid-cols-2 gap-3'>
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        data-slot="accordion-trigger"
                        className={cn(
                          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                          // "p-[10px] bg-[#171717] rounded-[8px] my-2 cursor-pointer text-white"
                        )}
                      >
                        <div className='p-[10px] bg-[#171717] rounded-[8px] text-white'>
                          <p className='text-[#ffffff7a] text-[14px] font-normal'>{task?.task?.title}</p>

                          <h4 className='text-white text-[14px] font-normal'>{task?.completedAt}</h4>
                        </div>

                        {/* <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" /> */}
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <div className='place-self-center justify-self-end'>
                      <Badge
                        variant={task?.status == "Complete" ? "success" : "in-progress"}
                      // className="border-transparent bg-[#2B2B2B] text-white [a&]:hover:bg-[#2B2B2B]/90 p-2"
                      >
                        {task?.status}
                      </Badge>
                    </div>
                  </div>

                  {/* <AccordionContent>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                      <p className='text-[#ffffff7a] text-[14px] font-normal'>Task Count</p>

                      <h4 className='text-white text-[14px] font-normal'>{task.taskCount}</h4>
                    </div>

                    <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                      <p className='text-[#ffffff7a] text-[14px] font-normal'>Points</p>

                      <h4 className='text-white text-[14px] font-normal'>{task.points}</h4>
                    </div>
                  </div>
                </AccordionContent> */}
                </AccordionItem>
              ))
            }

          </Accordion>

          <PaginationComponent
            page={page}
            totalPages={tasks.pagination.totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={setLimit}
          // limitOptions={[10, 20, 50, 100]}
          />
        </>
        : <EmptyState title='No tasks found.' />
        : <div className='flex items-center justify-center'>
          <Spinner size={64} />
        </div>
      }

    </div>
  )
}
