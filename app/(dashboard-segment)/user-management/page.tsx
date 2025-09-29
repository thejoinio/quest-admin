"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Mobile from "./Mobile";
import { useIsLargeScreen } from "@/services/hooks/useResponsiveScreen";
import { useAdminFetchUsers } from "@/services/hooks/useAdminHomeManagement";
import { PaginationComponent } from "@/components/PaginationComponent";
import {
  IFilterType,
  IRankFilter,
  IUserType,
} from "@/services/endpoints/dashboard/admin";
import { EmptyState } from "@/components/empty";
import { Spinner } from "@/components/preloader";

export default function Page() {
  const isLarge = useIsLargeScreen();

  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [rankFilter, setRankFilter] = useState<IRankFilter | undefined>(
    undefined
  );
  const [filterBy, setFilterBy] = useState<IFilterType>("all");
  const [userTypeFilter, setUserTypeFilter] = useState<IUserType | undefined>(
    undefined
  );
  const searchString =
    searchValue && userTypeFilter
      ? `${searchValue}, ${userTypeFilter}`
      : searchValue || userTypeFilter || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data: usersData, isLoading } = useAdminFetchUsers(
    page,
    limit,
    rankFilter,
    searchString
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const search = formData.get("search") as string;
    setSearchValue(search || searchInput);

    setPage(1); // reset pagination when searching
    setRankFilter(undefined); // reset rank filter when searching
  };

  const handleRankFilter = (rank: IRankFilter) => {
    setRankFilter(rank);
    setPage(1); // reset pagination when filtering
  };

  if (!isLarge) {
    return (
      <Mobile
        usersData={usersData}
        isLoading={isLoading}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        statusFilter={rankFilter}
        handleStatusFilter={handleRankFilter}
        handleSearch={handleSearch}
      />
    );
  }

  return (
    <section className="min-h-[80dvh]">
      <div className="flex justify-between items-center gap-5 mb-5">
        <CardTitle className="text-lg">User Management</CardTitle>
      </div>

      <Card className="bg-[#171717] text-white border-none shadow-lg min-w-[250px] p-[40px 32px] mx-auto">
        <CardHeader className="border-b border-[#2D2D2D]">
          <CardTitle className="text-lg mb-3">User list</CardTitle>

          <div className="flex justify-between items-center">
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
                  className="pl-10 border-[#222224] bg-[#222222] focus-visible:border-[#222224] h-[43px]"
                />
              </div>
            </form>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-[#cccccccc] font-dm-sans text-[14px] not-italic font-normal ">
                  Filter
                </p>

                <Select // defaultValue='rank'
                  value={filterBy}
                  onValueChange={(value) => {
                    if (value === "all") {
                      setRankFilter(undefined);
                      setUserTypeFilter(undefined);
                      setFilterBy("all");
                    } else {
                      setFilterBy(value as IFilterType);
                    }
                  }}
                >
                  <SelectTrigger
                    className="w-fit focus-visible:border-none "
                    style={{
                      background: "#222222",
                      border: "none",
                      color: "#cccccccc",
                    }}
                  >
                    <SelectValue
                      placeholder="Select Filter"
                      className="text-center font-dm-sans text-[14px] not-italic font-normal"
                    />
                  </SelectTrigger>

                  <SelectContent className="border-[#222222]">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="rank">Rank</SelectItem>
                    <SelectItem value="userType">User Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {filterBy === "rank" ? (
              <Select
                value={rankFilter}
                onValueChange={(value) =>
                  handleRankFilter(value.trim() as IRankFilter)
                }
              >
                <SelectTrigger
                  className="w-fit focus-visible:border-none "
                  style={{
                    background: "#222222",
                    border: "none",
                    color: "#cccccccc",
                  }}
                >
                  <SelectValue
                    placeholder="Select Rank"
                    className="text-center font-dm-sans text-[14px] not-italic font-normal"
                  />
                </SelectTrigger>

                <SelectContent className="border-[#222222]">
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
            ) : filterBy === "userType" ? (
              <Select
                value={userTypeFilter}
                onValueChange={(value) =>
                  setUserTypeFilter(value.trim() as IUserType)
                }
              >
                <SelectTrigger
                  className="w-fit focus-visible:border-none "
                  style={{
                    background: "#222222",
                    border: "none",
                    color: "#cccccccc",
                  }}
                >
                  <SelectValue
                    placeholder="Select User Type"
                    className="text-center font-dm-sans text-[14px] not-italic font-normal"
                  />
                </SelectTrigger>

                <SelectContent className="border-[#222222]">
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="ambassador">Ambassador</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                </SelectContent>
              </Select>
            ) : null}
          </div>
        </CardHeader>

        <CardContent>
          {usersData && !isLoading ? (
            usersData.data.length ? (
              <>
                <Table className="min-w-full">
                  <TableHeader className="">
                    <TableRow className="border-[#232323] hover:bg-transparent ">
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        Name
                      </TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        Email
                      </TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        User Type
                      </TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        Total Points
                      </TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        Current Rank
                      </TableHead>
                      <TableHead className="text-[#ffffff66] font-dm-sans text-[14px] not-italic font-[var(--Regular,400)]">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {usersData.data.map((user, index) => (
                      <TableRow
                        key={user?.id}
                        className="text-white border-[#232323] hover:bg-[#232323]/50 "
                      >
                        <TableCell className="flex items-center gap-2">
                          <span>{index + 1}.</span>
                          <span>{" " + user?.name}</span>
                        </TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell className="capitalize">
                          {user?.role}
                        </TableCell>
                        <TableCell>
                          {user?.userPoint?.totalPoints || 0}
                        </TableCell>
                        <TableCell className="capitalize">
                          {user?.userPoint?.currentRank}
                        </TableCell>
                        <TableCell>
                          <Link href={`/user-management/${user?.id}`}>
                            <Badge className="border-transparent bg-[#2B2B2B] text-[#A2A2A2] [a&]:hover:bg-[#2B2B2B]/90">
                              View Profile
                            </Badge>
                          </Link>
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
        </CardContent>
      </Card>
    </section>
  );
}
