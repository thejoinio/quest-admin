"use client";

import React, { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TaskHistory from "./TaskHistory";
import { useAdminFetchUserById } from "@/services/hooks/useAdminHomeManagement";
import { formatDate } from "@/lib/resources";
import EditRank from "./EditRank";
import AdjustPoints from "./AdjustPoints";
import AdminAction from "./AdminAction";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: usersData } = useAdminFetchUserById(id);

  const loadingView = (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-[#2b2b2b] rounded w-1/2"></div>
    </div>
  );

  function getInitials(name?: string | null): string {
    if (!name) return ""; // handles null, undefined, empty string

    // Trim spaces and split by whitespace
    const parts = name.trim().split(/\s+/);

    if (parts.length === 0) return "";

    // If name has more than one word, take first letter of first 2 words
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    // Otherwise take first 2 letters of the single word
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    <section className="min-h-[80dvh]">
      <div className="flex justify-between items-center gap-5 mb-5">
        <CardTitle className="text-lg">User Management</CardTitle>
      </div>

      <Card className="bg-[#171717] text-white border-none shadow-lg min-w-[250px] p-[40px 32px] mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg mb-3">User Profile</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <section className="col-span-1 md:col-span-2 lg:col-span-1 bg-[#1E1E1E] rounded-[12px] py-[25px] px-[15px]">
              <div className="flex flex-col justify-center items-center gap-[15px] mb-4 pb-4 border-b border-[#898989]">
                <Avatar className="w-[85px] h-[85px] rounded-full border-none">
                  <AvatarImage src={usersData?.data.avatar} />
                  <AvatarFallback>
                    {getInitials(usersData?.data.name || "AA")}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-[#fff] text-center font-dm-sans text-[18px]">
                  {usersData ? usersData?.data.name : loadingView}
                  <small className="text-[#898989] text-[12px]">
                    {usersData
                      ? usersData?.data.isActive
                        ? " (Active)"
                        : " (Not Active)"
                      : loadingView}
                  </small>
                </h3>

                <div className="bg-[#FCE08550] rounded-[8px] px-[10px] py-[5px] text-center w-fit">
                  <p className="text-[#E0A326] p-0 m-0 capitalize">
                    {usersData?.data?.userPoint?.currentRank}
                  </p>
                </div>

                <div className="text-[#898989] text-center font-dm-sans text-[12px]">
                  {usersData ? usersData?.data?.email : loadingView}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <section className="space-y-2 center text-center border border-[#3B3939] rounded-[8px] py-[14px] px-[9px]">
                  <h2 className="text-white text-center font-dm-sans text-[24px]">
                    {usersData
                      ? usersData?.data?.completedTasksCount
                      : loadingView}
                  </h2>

                  <p className="text-[#A2A2A2] text-center font-dm-sans text-[12px]">
                    Task Completed
                  </p>
                </section>

                <section className="space-y-2 center text-center border border-[#3B3939] rounded-[8px] py-[14px] px-[9px]">
                  <h2 className="text-white text-center font-dm-sans text-[24px]">
                    {usersData
                      ? usersData.data?.userPoint?.totalPoints || 0
                      : loadingView}
                  </h2>

                  <p className="text-[#A2A2A2] text-center font-dm-sans text-[12px]">
                    Points Earned
                  </p>
                </section>

                <section className="space-y-2 center text-center border border-[#3B3939] rounded-[8px] py-[14px] px-[9px]">
                  <h2 className="text-white text-center font-dm-sans text-[24px]">
                    {usersData
                      ? formatDate(usersData.data?.createdAt)
                      : loadingView}
                  </h2>

                  <p className="text-[#A2A2A2] text-center font-dm-sans text-[12px]">
                    Joined
                  </p>
                </section>

                <section className="space-y-2 center text-center border border-[#3B3939] rounded-[8px] py-[14px] px-[9px]">
                  <h2 className="text-white text-center font-dm-sans text-[24px] capitalize">
                    {usersData
                      ? usersData?.data?.userPoint?.currentRank
                      : loadingView}
                  </h2>

                  <p className="text-[#A2A2A2] text-center font-dm-sans text-[12px]">
                    Current Rank
                  </p>
                </section>
              </div>
            </section>

            <section className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#1E1E1E] rounded-[12px] py-[25px] px-[15px]">
              <CardTitle className="text-lg mb-3">Task History</CardTitle>
              <TaskHistory id={id} />
            </section>

            {/* Edit Rank */}
            <EditRank usersData={usersData} user_id={id} />

            {/* Adjust Points */}
            <AdjustPoints usersData={usersData} user_id={id} />

            {/* Admin Action */}
            <AdminAction usersData={usersData} user_id={id} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
