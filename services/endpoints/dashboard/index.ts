import { get } from "@/services/axios";
import { IFetchDashboardResponse } from "./definitions";

export const fetchDashboard = async (): Promise<IFetchDashboardResponse> => {
  const response = await get<IFetchDashboardResponse>("/dashboard");
  return response;
};
