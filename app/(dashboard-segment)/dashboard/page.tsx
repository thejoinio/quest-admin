"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Link from "next/link";
import TopUsers from "./TopUsers";
import { useFetchAdminDashboard } from "@/services/hooks/useAdminHomeManagement";
import { abbreviateNumber } from "@/lib/resources";


export default function Page() {
  const { data: createAdminDashboard } = useFetchAdminDashboard();

  const transformWeekStat = (allWeekStat: { week: number; percentage: number; }[]) => {
    const colors = ["#ffffff", "#93c5fd", "#86efac", "#1e3a8a"];

    return allWeekStat.slice(0, 4).map((item, index) => ({
      name: `Week ${item.week}`,
      value: item.percentage,
      color: colors[index] || "#4c4c4cff", // fallback color if more than 4 items
    }));
  }

  const loadingView = (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-[#2b2b2b] rounded w-1/2"></div>
      {/* <div className="h-3 bg-muted rounded w-3/4"></div> */}
    </div>
  );

  const formatedNumber = (number: number, locales = 'en-US', options = {}) => {
    return new Intl.NumberFormat(locales, options).format(number);
  }
  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0; // avoid division by zero
    return (value / total) * 100;
  }


  return (
    <div className="bg-[#232323]">
      <div className="flex justify-between align-center">
        <h3 className="text-white font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px] [font-feature-settings:'liga'_off,'clig'_off]">
          Dashboard
        </h3>
        <Link href={"/dashboard/create-ambassador"}>
          <Button size={"md"} variant={"gradient"}>
            Create Ambassadors
          </Button>
        </Link>
      </div>

      <section className="flex justify-between align-center gap-[24px] flex-wrap my-5">
        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Total Users
          </p>

          <div>
            {createAdminDashboard ?
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {/* 12,450 */}
                {formatedNumber(createAdminDashboard.totalUser)}
              </p>
              : loadingView}
          </div>

          <div>
            {createAdminDashboard ?
              <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
                {/* 10,800 Active / 1,650 Inactive */}
                {`${formatedNumber(createAdminDashboard.numberOfActiveUser) + " Active / " +
                  formatedNumber(createAdminDashboard.numberofInActiveUser) + " Inactive"
                  }`}
              </p>
              : loadingView}
          </div>

        </div>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Total Ambassadors
          </p>

          <div>
            {createAdminDashboard ?
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {/* 58 */}
                {formatedNumber(createAdminDashboard.numberOfKol)}
              </p>
              : loadingView}
          </div>
          <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            {" "}
          </p>
        </div>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Total Points Earned
          </p>

          <div>
            {createAdminDashboard ?
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {/* 22,256 */}
                {formatedNumber(createAdminDashboard.totalPoint)}
              </p>
              : loadingView}
          </div>
          <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            {" "}
          </p>
        </div>
      </section>

      <section className="flex justify-between align-center gap-[24px] flex-wrap my-5">
        <Card className="bg-[#171717] text-white border-none shadow-lg flex-1 min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-lg">Task Participation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="w-40 h-40">
              <ResponsiveContainer>
                <PieChart>
                  {createAdminDashboard ?
                    <Pie
                      data={transformWeekStat(createAdminDashboard.allWeekStat)}
                      innerRadius="60%"
                      outerRadius="100%"
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {transformWeekStat(createAdminDashboard.allWeekStat).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    : loadingView
                  }
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 text-sm">
              {createAdminDashboard ? transformWeekStat(createAdminDashboard.allWeekStat).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="block w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </div>
                  <span>{item.value}%</span>
                </div>
              )) : loadingView}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <div className="flex align-center gap-1">
            <p className="text-white font-dm-sans text-[18px] not-italic font-semibold leading-[20px] tracking-[var(--Letter-Spacing,0)]">
              Week 1
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M3.87099 7.55483C3.34059 6.94868 3.77107 6 4.57653 6H13.4237C14.2291 6 14.6596 6.94868 14.1292 7.55483L9.9879 12.2879C9.46492 12.8855 8.5353 12.8855 8.01232 12.2879L3.87099 7.55483ZM4.98973 7.125L8.859 11.547C8.9337 11.6324 9.06652 11.6324 9.14122 11.547L13.0105 7.125H4.98973Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex flex-col align-center flex-1 gap-[12px] mt-3">
            {createAdminDashboard ? createAdminDashboard.weeklyTask.length ?
              createAdminDashboard.weeklyTask.map((task, index) => (
                <div key={task.id || index} className="">
                  <p className="text-white font-dm-sans text-[12px] not-italic font-semibold leading-[16px] tracking-[var(--Letter-Spacing,0)]">
                    {/* Join server */}
                    {task.title}
                  </p>
                  <div className="flex justify-between items-center gap-[24px]">
                    <Progress
                      value={task.participantCount}
                      className="bg-[#CCD4FF] w-full"
                      variant="gradient"
                    />
                    <p className="text-[#CCC] font-dm-sans text-[12px] not-italic font-medium leading-[16px] whitespace-nowrap p-0 m-0">
                      {/* {calculatePercentage(Number(task.participantCount || 0), createAdminDashboard.numberOfActiveUser)} Participants */}
                      {abbreviateNumber(calculatePercentage(Number(task.participantCount || 0), createAdminDashboard.numberOfActiveUser), 1)} Participants
                    </p>
                  </div>
                </div>
              ))
              : <div>Empty task stats</div>
              : loadingView
            }
          </div>
        </div>
      </section>

      <section className="rounded-[12px] bg-[#171717] text-white overflow-hidden flex-wrap my-5">
        <Card className="bg-[#171717] border-none">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-white font-dm-sans text-[18px] not-italic font-semibold">
              Top Users
              <span className="text-white font-dm-sans text-[18px] not-italic font-normal">
                {" "}
                (Leaderboard)
              </span>
            </CardTitle>

            <div className="text-white"> </div>
            {/* <div className="text-white">...</div> */}
          </CardHeader>
          <CardContent>
            <TopUsers />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
