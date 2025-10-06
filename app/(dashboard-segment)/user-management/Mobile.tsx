import React from "react";

import Link from "next/link";
import { CardTitle } from "@/components/ui/card";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAdminUsersResponse } from "@/services/definitions/adminInterface";
import { IRankFilter } from "@/services/endpoints/dashboard/admin";
import { EmptyState } from "@/components/empty";
import { PaginationComponent } from "@/components/PaginationComponent";
import { Spinner } from "@/components/preloader";

interface _props {
  usersData: IAdminUsersResponse | undefined;
  isLoading: boolean;

  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;

  statusFilter: IRankFilter | undefined;
  // setStatusFilter: React.Dispatch<React.SetStateAction<IRankFilter | undefined>>,

  handleStatusFilter: (status: IRankFilter) => void;
  handleSearch: (e: React.FormEvent<Element>) => void;
}

export default function Mobile({
  usersData,
  isLoading,
  searchInput,
  setSearchInput,
  page,
  setPage,
  limit,
  setLimit,
  statusFilter,
  handleStatusFilter,
  handleSearch,
}: _props) {
  return (
    <section className="min-h-[80dvh]">
      <div className="flex justify-between items-center gap-5 mb-5">
        <CardTitle className="text-lg">User Management</CardTitle>
      </div>

      <div className="space-y-5">
        <CardTitle className="text-lg">User List</CardTitle>

        <div className="flex justify-between items-end ">
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

          <div className="space-y-1">
            <p className="text-[#cccccccc] font-dm-sans text-[14px] not-italic font-normal ">
              Filter
            </p>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                handleStatusFilter(value.trim() as IRankFilter)
              }
            >
              <SelectTrigger
                className="w-[92px] focus-visible:border-none rounded-[8px]"
                style={{
                  background: "#171717",
                  border: "none",
                  color: "#cccccccc",
                  height: "43px",
                }}
              >
                <SelectValue
                  placeholder="Select"
                  className="text-center font-dm-sans text-[14px] not-italic font-normal"
                />
              </SelectTrigger>

              <SelectContent className="border-[#171717]">
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="earth">Earth</SelectItem>
                <SelectItem value="air">Air</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="ice">Ice</SelectItem>
                <SelectItem value="lightning">Lightning</SelectItem>
                <SelectItem value="spirit">Spirit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {usersData && !isLoading ? (
          usersData.data ? (
            <>
              <Accordion type="single" collapsible>
                {usersData.data.map((user, index) => (
                  <AccordionItem
                    key={user?.id}
                    value={`${index}`}
                    className="bg-[#1E1E1E] rounded-[8px] px-[10px] border-none mb-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <AccordionPrimitive.Header className="flex">
                        <AccordionPrimitive.Trigger
                          data-slot="accordion-trigger"
                          className={cn(
                            "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                            "p-[10px] bg-[#171717] rounded-[8px] my-2 cursor-pointer "
                          )}
                        >
                          <div>
                            <h3 className="text-white text-[14px] font-medium ">
                              {user?.name}
                            </h3>
                            <p className="text-[#ffffff7a]">{user?.role}</p>
                          </div>

                          <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>

                      <div className="place-self-center justify-self-end">
                        <Link href={`/user-management/${user?.id}`}>
                          <Badge className="border-transparent bg-[#2B2B2B] text-white [a&]:hover:bg-[#2B2B2B]/90 p-2">
                            View Profile
                          </Badge>
                        </Link>
                      </div>
                    </div>

                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-[10px] bg-[#171717] rounded-[8px]">
                          <p className="text-[#ffffff7a] text-[14px] font-normal">
                            Email
                          </p>

                          <h4 className="text-white text-[14px] font-normal truncate">
                            {user?.email}
                          </h4>
                        </div>

                        <div className="p-[10px] bg-[#171717] rounded-[8px]">
                          <p className="text-[#ffffff7a] text-[14px] font-normal">
                            Total Points
                          </p>

                          <h4 className="text-white text-[14px] font-normal">
                            {user?.userPoint?.totalPoints || 0}
                          </h4>
                        </div>

                        <div className="p-[10px] bg-[#171717] rounded-[8px]">
                          <p className="text-[#ffffff7a] text-[14px] font-normal">
                            Current Rank
                          </p>

                          <h4 className="text-white text-[14px] font-normal">
                            {user?.userPoint?.currentRank || "N/A"}
                          </h4>
                        </div>

                        {/* <div className='p-[10px] bg-[#171717] rounded-[8px]'>
                        <p className='text-[#ffffff7a] text-[14px] font-normal'>Completed Tasks</p>

                        <h4 className='text-white text-[14px] font-normal'>{user.completedTasks}</h4>
                      </div> */}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
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
          ) : (
            <EmptyState title="No user found." />
          )
        ) : (
          <div className="flex items-center justify-center">
            <Spinner size={64} />
          </div>
        )}
      </div>
    </section>
  );
}
