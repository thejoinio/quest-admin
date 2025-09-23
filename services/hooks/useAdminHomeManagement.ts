import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";
import { toast } from "sonner";
import { TError } from "@/types/errorType";
import {
  adminCreateTask, adminFetchUserById, adminFetchUsers,
  adminFetchUserTaskHistoryById, adminUpdateUserPoint,
  adminUserActions, adminUserEditRank, createKolUser,
  fetchAdminDashboard, fetchAdminDashboardOverviewLeaderboard,
  fetchAdminTaskManagement, IAdminUpdateUserPoints,
  IAdminUserActions, IAdminUserEditRank, IRankFilter, ITaskStatus
} from "../endpoints/dashboard/admin";
import {
  ICreateUserPayload, IResponse,
  IAdminTaskManagementResponse, IAdminCreateTaskPayload,
  IAdminCreateTaskResData,
  IAdminDashboardResData,
  IAdminUsersResponse,
  IAdminSingleUserResponse,
  IAdminFetchUserTaskHistory,
  profileUpdateResponse,
  IAdminDashboardOverviewLeaderboard
} from "../definitions/adminInterface";


export const useCreateKolUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<any>, TError, ICreateUserPayload>({
    mutationFn: createKolUser,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_KOL] });
      toast.success(data.message || "Account created successfully", { description: "" });

      // console.log("Profile updated successfully:", data);
      // You might want to show a success toast message here
    },
    onError: (error: TError) => {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast message here

      const message = error?.response?.data?.message || error?.message || "Failed to update profile, try again later.";
      toast.error(message);
    },
  });
};



// ADMIN DASHBOARD 

export const useFetchAdminDashboard = () => {
  return useQuery<IAdminDashboardResData, Error>({
    queryKey: [QUERY_KEYS.ADMIN_DASHBOARD],
    queryFn: fetchAdminDashboard,
  });
};

export const useFetchAdminDashboardOverviewLeaderboard = (page: number, limit: number) => {
  return useQuery<IAdminDashboardOverviewLeaderboard, Error>({
    queryKey: [QUERY_KEYS.ADMIN_DASHBOARD, "leaderboard"],
    queryFn: () => fetchAdminDashboardOverviewLeaderboard(page, limit),
  });
};



// TASK MANAGEMENT 

export const useFetchAdminTaskManagement = (page: number, limit: number, status?: ITaskStatus, search?: string) => {
  return useQuery<IAdminTaskManagementResponse, Error>({
    queryKey: [QUERY_KEYS.ADMIN_TASK_MANAGEMENT, page, limit, status, search],
    queryFn: () => fetchAdminTaskManagement(page, limit, status, search),
  });
};

export const useAdminCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<IAdminCreateTaskResData>, TError, IAdminCreateTaskPayload>({
    mutationFn: adminCreateTask,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_TASK_MANAGEMENT] });
      toast.success(data.message || "Task created successfully", { description: "" });

      // console.log("Profile updated successfully:", data);
      // You might want to show a success toast message here
    },
    onError: (error: TError) => {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast message here

      const message = error?.response?.data?.message || error?.message || "Failed to update profile, try again later.";
      toast.error(message);
    },
  });
};




// USER MANAGEMENT 

export const useAdminFetchUsers = (page: number, limit: number, rank?: IRankFilter, search?: string) => {
  return useQuery<IAdminUsersResponse, Error>({
    queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, page, limit, rank, search],
    queryFn: () => adminFetchUsers(page, limit, rank, search),
  });
};

export const useAdminFetchUserById = (id: string) => {
  return useQuery<IResponse<IAdminSingleUserResponse>, Error>({
    queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, id],
    queryFn: () => adminFetchUserById(id),
  });
};

export const useAdminFetchUserTaskHistoryById = (id: string, page: number, limit: number) => {
  return useQuery<IAdminFetchUserTaskHistory, Error>({
    queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, "task-history", id, page, limit],
    queryFn: () => adminFetchUserTaskHistoryById(id, page, limit),
  });
};

// export const useAdminUserEditRank = (user_id: string) => {
//   return useQuery<IAdminFetchUserTaskHistory, Error>({
//     queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, "edit-rank", user_id],
//     queryFn: () => adminUserEditRank(user_id),
//   });
// };



export const useAdminUserEditRank = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<profileUpdateResponse, TError, IAdminUserEditRank>({
    mutationFn: adminUserEditRank,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, user_id] });
      toast.success(data.message || "User rank updated successfully", { description: "" });

      // console.log("Profile updated successfully:", data);
      // You might want to show a success toast message here
    },
    onError: (error: TError) => {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast message here

      const message = error?.response?.data?.message || error?.message || "Failed to update profile, try again later.";
      toast.error(message);
    },
  });
};

export const useAdminUpdateUserPoint = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<profileUpdateResponse, TError, IAdminUpdateUserPoints>({
    mutationFn: adminUpdateUserPoint,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, user_id] });
      toast.success(data.message || "User points updated successfully", { description: "" });

      // console.log("Profile updated successfully:", data);
      // You might want to show a success toast message here
    },
    onError: (error: TError) => {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast message here

      const message = error?.response?.data?.message || error?.message || "Failed to update profile, try again later.";
      toast.error(message);
    },
  });
};

export const useAdminUserActions = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<profileUpdateResponse, TError, IAdminUserActions>({
    mutationFn: adminUserActions,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: ["admin", QUERY_KEYS.ADMIN_USER_MANAGEMENT, user_id] });
      toast.success(data.message || "User points updated successfully", { description: "" });

      // console.log("Profile updated successfully:", data);
      // You might want to show a success toast message here
    },
    onError: (error: TError) => {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast message here

      const message = error?.response?.data?.message || error?.message || "Failed to update profile, try again later.";
      toast.error(message);
    },
  });
};


