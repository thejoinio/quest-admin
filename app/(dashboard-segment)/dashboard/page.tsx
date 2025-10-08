"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { useFetchAdminDashboard } from "@/services/hooks/useAdminHomeManagement";
import { EmptyState } from "@/components/empty";
import TopUsers from "./TopUsers";
import { useMemo } from "react";

export default function Page() {
  const { data: createAdminDashboard, isPending } = useFetchAdminDashboard();

  const transformWeekStat = (
    allWeekStat: { week: number; percentage: number }[]
  ) => {
    const colors = ["#ffffff", "#93c5fd", "#86efac", "#1e3a8a"];

    return allWeekStat.slice(0, 4).map((item, index) => ({
      name: `Week ${item.week}`,
      value: item.percentage,
      color: colors[index] || "#4c4c4cff", // fallback color if more than 4 items
    }));
  };

  const loadingView = (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-[#2b2b2b] rounded w-1/2"></div>
    </div>
  );

  const formatedNumber = (number: number, locales = "en-US", options = {}) => {
    return new Intl.NumberFormat(locales, options).format(number);
  };

  const pieChartData = useMemo(
    () =>
      transformWeekStat(
        createAdminDashboard?.allWeekStat || [{ week: 0, percentage: 0 }]
      ),
    [createAdminDashboard?.allWeekStat]
  );

  const showPieChart =
    !isPending &&
    createAdminDashboard?.allWeekStat?.length &&
    createAdminDashboard.allWeekStat.some((stat) => stat.percentage > 0);

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
            {isPending ? (
              loadingView
            ) : (
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {formatedNumber(createAdminDashboard?.totalUser || 0)}
              </p>
            )}
          </div>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
                {`${
                  formatedNumber(
                    createAdminDashboard?.numberOfActiveUser || 0
                  ) +
                  " Active / " +
                  formatedNumber(
                    createAdminDashboard?.numberofInActiveUser || 0
                  ) +
                  " Inactive"
                }`}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Total Ambassadors
          </p>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {formatedNumber(createAdminDashboard?.numberOfAmbassador || 0)}
              </p>
            )}
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
            {isPending ? (
              loadingView
            ) : (
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {formatedNumber(createAdminDashboard?.totalPoint || 0)}
              </p>
            )}
          </div>
          <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            {" "}
          </p>
        </div>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Users Engagement
          </p>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {`${
                  formatedNumber(
                    createAdminDashboard?.numberOfMonthlyActiveUsers || 0
                  ) + " MAU"
                }`}
              </p>
            )}
          </div>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
                Monthly Active Users (MAU)
              </p>
            )}
          </div>
        </div>
        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <p className="text-[rgba(255,255,255,0.98)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[14px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
            Users Engagement
          </p>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="text-white [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[24px] not-italic font-semibold leading-[24px] tracking-[-0.2px]">
                {`${
                  formatedNumber(
                    createAdminDashboard?.numberOfDailyActiveUsers || 0
                  ) + " DAU"
                }`}
              </p>
            )}
          </div>

          <div>
            {isPending ? (
              loadingView
            ) : (
              <p className="mt-[16px] text-[var(--Grey-grey-600,#898989)] [font-feature-settings:'liga'_off,'clig'_off] font-dm-sans text-[12px] not-italic font-normal leading-[24px] tracking-[-0.2px]">
                Daily Active Users (DAU)
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="flex justify-between align-center gap-[24px] flex-wrap my-5">
        <Card className="bg-[#171717] text-white border-none shadow-lg flex-1 min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-lg">Task Participation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            {isPending ? (
              loadingView
            ) : showPieChart ? (
              <>
                <div className="w-40 h-40">
                  <ResponsiveContainer>
                    <PieChart>
                      {isPending ? (
                        loadingView
                      ) : (
                        <Pie
                          data={pieChartData}
                          innerRadius="60%"
                          outerRadius="100%"
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      )}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <EmptyState title="No task participation data available." />
            )}

            <div className="space-y-3 text-sm">
              {isPending
                ? loadingView
                : createAdminDashboard
                ? pieChartData.map((item, index) => (
                    <div
                      key={item.value || index}
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
                  ))
                : null}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-[12px] bg-[#171717] p-6 flex-1 min-w-[250px]">
          <div className="flex align-center gap-1">
            <p className="text-white font-dm-sans text-[18px] not-italic font-semibold leading-[20px] tracking-[var(--Letter-Spacing,0)]">
              Weekly Task Participation
            </p>
          </div>

          <div className="flex flex-col align-center flex-1 gap-[12px] mt-3">
            {isPending ? (
              loadingView
            ) : createAdminDashboard ? (
              createAdminDashboard?.weeklyTask?.length > 0 ? (
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
                        {Number(task.participantCount || 0)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState title="No weekly task participation data at the moment." />
              )
            ) : (
              loadingView
            )}
          </div>
        </div>
      </section>

      <section className="flex rounded-[12px] bg-[#171717] text-white overflow-hidden flex-wrap my-5 w-full">
        <Card className="bg-[#171717] border-none w-full">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-white font-dm-sans text-[18px] not-italic font-semibold">
              Top Users
              <span className="text-white font-dm-sans text-[18px] not-italic font-normal">
                {" "}
                (Leaderboard)
              </span>
            </CardTitle>

            <div className="text-white"> </div>
          </CardHeader>
          <CardContent>
            <TopUsers />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
