import { get } from "@/services/axios";
// import { IFetchProfileResponse, IFetchResponse, ILeaderboard } from "@/services/definitions/profile";



export interface currentWeekResponse {
  success: boolean;
  message: string;
  data: {
    weekNumber: number,
    startDate: string;
    endDate: string;
    monthYear: string;
  }
}

export const currentWeek = async (): Promise<currentWeekResponse> => {
  const response = await get<currentWeekResponse>("/week-info/current");
  return response;
};
