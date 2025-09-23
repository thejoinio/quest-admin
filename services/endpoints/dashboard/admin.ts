import { get, patch, post } from "@/services/axios";
import {
  ICreateUserPayload, IResponse, IAdminTaskManagementResponse, IAdminCreateTaskPayload,
  IAdminCreateTaskResData, IAdminDashboardResData, IAdminUsersResponse, IAdminSingleUserResponse,
  IAdminFetchUserTaskHistory, profileUpdateResponse,
  IAdminDashboardOverviewLeaderboard
} from "@/services/definitions/adminInterface";

export const createKolUser = async (payload: ICreateUserPayload): Promise<IResponse<any>> => {
  const response = await post<IResponse<any>>("/admin/kol/create-account", payload);
  return response;
};


// TASK MANAGEMENT 

export const fetchAdminDashboard = async (): Promise<IAdminDashboardResData> => {
  const response = await get<IAdminDashboardResData>("/admin/dashboard");
  return response;
};


export const fetchAdminDashboardOverviewLeaderboard = async (page: number, limit: number): Promise<IAdminDashboardOverviewLeaderboard> => {
  const response = await get<IAdminDashboardOverviewLeaderboard>("/admin/leaderboard", { page, limit });
  return response;
};



// TASK MANAGEMENT 
export type ITaskStatus = "active" | "inactive" | "ongoing" | "completed";
// type ITaskType = "hot" | "normal";
export const fetchAdminTaskManagement = async (page: number, limit: number, status?: ITaskStatus, search?: string): Promise<IAdminTaskManagementResponse> => {
  const response = await get<IAdminTaskManagementResponse>("/admin/task-management", { page, limit, status, search });
  return response;
};

export const adminCreateTask = async (payload: IAdminCreateTaskPayload): Promise<IResponse<IAdminCreateTaskResData>> => {
  const response = await post<IResponse<IAdminCreateTaskResData>>("/task", payload);
  // console.log(response);
  return response;
};





// USER MANAGEMENT 
export type IRankFilter = "water" | "earth" | "air" | "fire" | "metal" | "ice" | "lightning" | "spirit";
export const adminFetchUsers = async (page: number, limit: number, rank?: IRankFilter, search?: string): Promise<IAdminUsersResponse> => {
  const response = await get<IAdminUsersResponse>("/admin/profiles", { page, limit, rank, search });
  // console.log(response);
  return response;
};

export const adminFetchUserById = async (id: string): Promise<IResponse<IAdminSingleUserResponse>> => {
  const response = await get<IResponse<IAdminSingleUserResponse>>(`/admin/profiles/${id}`);
  // console.log(response);
  return response;
};


export const adminFetchUserTaskHistoryById = async (id: string, page: number, limit: number): Promise<IAdminFetchUserTaskHistory> => {
  const response = await get<IAdminFetchUserTaskHistory>(`/admin/user/${id}/task-history`, { page, limit });
  // console.log(response);
  return response;
};


// update-rank
export interface IAdminUserEditRank {
  user_id: string,
  payload: { rank: string }
}
export const adminUserEditRank = async (data: IAdminUserEditRank): Promise<profileUpdateResponse> => {
  const response = await patch<profileUpdateResponse>(`/admin/profile/${data.user_id}/update-rank`, data.payload);
  // console.log(response);
  return response;
};

// update-point
export interface IAdminUpdateUserPoints {
  user_id: string,
  payload: { points: number }
}
export const adminUpdateUserPoint = async (data: IAdminUpdateUserPoints): Promise<profileUpdateResponse> => {
  const response = await patch<profileUpdateResponse>(`/admin/profile/${data.user_id}/update-point`, data.payload);
  // console.log(response);
  return response;
};

// action
export interface IAdminUserActions {
  user_id: string,
  payload: { action: string }
}
export const adminUserActions = async (data: IAdminUserActions): Promise<profileUpdateResponse> => {
  const response = await patch<profileUpdateResponse>(`/admin/profile/${data.user_id}/action`, data.payload);
  // console.log(response);
  return response;
};

