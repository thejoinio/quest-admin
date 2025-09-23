"use client";

import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Mobile from "./Mobile";
import { useIsLargeScreen } from "@/services/hooks/useResponsiveScreen";
import { useFetchAdminTaskManagement } from '@/services/hooks/useAdminHomeManagement';
import { useState } from 'react';
import { EmptyState } from '@/components/empty';
import { PaginationComponent } from '@/components/PaginationComponent';
import { ITaskStatus } from '@/services/endpoints/dashboard/admin';
import { Spinner } from '@/components/preloader';
import { formatDate } from '@/lib/resources';


export default function Page() {
  const isLarge = useIsLargeScreen();

  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<ITaskStatus | undefined>();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data: tasks, isLoading } = useFetchAdminTaskManagement(page, limit, statusFilter, searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const search = formData.get("search") as string;
    setSearchValue(search || searchInput);

    setPage(1); // reset pagination when searching
    setStatusFilter(undefined); // reset status filter when searching
  }

  const handleStatusFilter = (status: ITaskStatus) => {
    setStatusFilter(status);
    setPage(1); // reset pagination when filtering
  }

  if (!isLarge) {
    return <Mobile tasks={tasks} isLoading={isLoading}
      handleSearch={handleSearch}
      handleStatusFilter={handleStatusFilter}
      limit={limit} setLimit={setLimit}
      page={page} setPage={setPage}
      searchInput={searchInput} setSearchInput={setSearchInput}
      statusFilter={statusFilter}
    />
  }

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

      <Card className="bg-[#171717] text-white border-none shadow-lg min-w-[250px] p-[40px 32px] mx-auto">
        <CardHeader className='border-b border-[#2D2D2D]'>
          <CardTitle className="text-lg mb-3">Task List</CardTitle>

          <div className='flex justify-between items-center'>
            <form onSubmit={handleSearch}>
              <div className="relative bg-[#222222] max-w-[240px] rounded-[8px]">
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
                  className="pl-10 border-[#222224] bg-[#222222] h-[43px] focus-visible:border-[#222224] "
                />
              </div>

            </form>

            <div>
              <div className='flex items-center gap-2'>
                <p className="text-[#cccccccc] font-dm-sans text-[14px] not-italic font-normal "
                >Filter</p>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleStatusFilter(value.trim() as ITaskStatus)}
                >
                  <SelectTrigger className="w-[92px] focus-visible:border-none " style={{ background: "#222222", border: "none", color: "#cccccccc" }}>
                    <SelectValue placeholder="Status" className="text-center font-dm-sans text-[14px] not-italic font-normal" />
                  </SelectTrigger>

                  <SelectContent className='border-[#222222]'>
                    <SelectItem value=" ">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

              </div>

            </div>
          </div>
        </CardHeader>

        <CardContent>
          {
            tasks && !isLoading ? tasks.data.length ?
              <>
                <Table className="min-w-full">
                  <TableHeader className="">
                    <TableRow className="border-[#232323] hover:bg-transparent ">
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Title</TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Type</TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Points</TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Expiration</TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {tasks.data.map((task, index) => (
                      <TableRow key={index} className="text-white border-[#232323] hover:bg-[#232323]/50 ">
                        {/* <TableCell className="font-medium">{user.rank}</TableCell> */}
                        <TableCell className="flex items-center gap-2">
                          <span>{index + 1}.</span>
                          <span>{" " + task.title}</span>
                        </TableCell>
                        <TableCell>{task.type}</TableCell>
                        <TableCell>{task.pointsReward}</TableCell>
                        <TableCell>{task.expirationTimestamp ? formatDate(task.expirationTimestamp) : ""}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              task.isActive ? "success" : "destructive"
                            }
                          // className="border-transparent bg-[#2B2B2B] text-[#A2A2A2] [a&]:hover:bg-[#2B2B2B]/90"
                          >
                            {task.isActive ? "Active" : "Expired"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                    }
                  </TableBody>
                </Table>

                <PaginationComponent
                  page={page}
                  totalPages={tasks.pagination.totalPages}
                  onPageChange={setPage}
                  limit={limit}
                  onLimitChange={setLimit}
                // limitOptions={[10, 20, 50, 100]}
                />
              </>
              : <EmptyState title="No task found." />
              : <div className='flex items-center justify-center'>
                <Spinner size={64} />
              </div>
          }
        </CardContent>
      </Card>
    </section>
  )
}
