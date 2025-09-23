import React from 'react'

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, Search } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IAdminTaskManagementResponse } from '@/services/definitions/adminInterface';
import { EmptyState } from '@/components/empty';
import { PaginationComponent } from '@/components/PaginationComponent';
import { ITaskStatus } from '@/services/endpoints/dashboard/admin';
import { Spinner } from '@/components/preloader';

interface _props {
  tasks: IAdminTaskManagementResponse | undefined,
  isLoading: boolean,

  searchInput: string,
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,

  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,

  statusFilter: ITaskStatus | undefined,
  // setStatusFilter: React.Dispatch<React.SetStateAction<ITaskStatus | undefined>>,

  handleStatusFilter: (status: ITaskStatus) => void,
  handleSearch: (e: React.FormEvent<Element>) => void
}

export default function Mobile({
  tasks, isLoading, searchInput, setSearchInput, page, setPage, limit, setLimit, statusFilter, handleStatusFilter, handleSearch
}: _props) {


  return (
    <section className='min-h-[80dvh]'>
      <div className='flex justify-between items-center gap-5 mb-5'>
        <CardTitle className="text-lg">Task Management</CardTitle>

        <Link href={"/task-management/create-task"}>
          <Button
            size={"md"}
            variant={"gradient"}
          >Create Task</Button>
        </Link>
      </div>


      <div className='space-y-5'>
        <CardTitle className="text-lg">Task List</CardTitle>

        <div className='flex justify-between items-end '>
          <form onSubmit={handleSearch}>
            <div className="relative bg-[#171717] max-w-[240px] rounded-[8px]">
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                <Search size={18} />
              </button>

              <Input
                type="search"
                placeholder="Search. . ."
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 border-[#222224] bg-[#222222] focus-visible:border-[#222224] h-[43px]"
              />
            </div>
          </form>

          <div className='space-y-1'>
            <p className="text-[#cccccccc] font-dm-sans text-[14px] not-italic font-normal "
            >Filter</p>

            <Select
              value={statusFilter}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-[92px] focus-visible:border-none rounded-[8px]" style={{ background: "#171717", border: "none", color: "#cccccccc", height: "43px" }}>
                <SelectValue placeholder="Status" className="text-center font-dm-sans text-[14px] not-italic font-normal" />
              </SelectTrigger>

              <SelectContent className='border-[#171717]' >
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {
          tasks && !isLoading ? tasks.data.length ? (
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
                              "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                              "p-[10px] bg-[#171717] rounded-[8px] my-2 cursor-pointer "
                            )}
                          >
                            <h3 className='text-white text-[14px] font-medium '>{task.title}</h3>

                            <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                          </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>


                        <div className='place-self-center justify-self-end'>
                          <Badge
                            variant={task.isActive ? "success" : "destructive"}
                          // className="border-transparent bg-[#2B2B2B] text-[#A2A2A2] [a&]:hover:bg-[#2B2B2B]/90"
                          >{task.isActive ? "Active" : "Expired"}</Badge>
                        </div>

                      </div>

                      <AccordionContent>
                        <div className='grid grid-cols-2 gap-3'>

                          <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                            <p className='text-[#ffffff7a] text-[14px] font-normal'>Type</p>

                            <h4 className='text-white text-[14px] font-normal'>{task.type}</h4>
                          </div>

                          <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                            <p className='text-[#ffffff7a] text-[14px] font-normal'>Points</p>

                            <h4 className='text-white text-[14px] font-normal'>{task.pointsReward}</h4>
                          </div>

                          <div className='col-span-2 p-[10px] bg-[#171717] rounded-[8px]'>
                            <p className='text-[#ffffff7a] text-[14px] font-normal'>Expiration</p>

                            <h4 className='text-white text-[14px] font-normal'>{task.expirationTimestamp}</h4>
                          </div>
                        </div>
                      </AccordionContent>
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

          )
            : <EmptyState title="No task found." />
            : <div className='flex items-center justify-center'>
              <Spinner size={64} />
            </div>
        }
      </div>

    </section>
  )
}
