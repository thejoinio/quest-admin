/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from "@/services/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Itype, Istatus, IFetchTaskResponse, ITaskData
} from "@/services/definitions/tasks";



const fetchAllTasks = async (): Promise<IFetchTaskResponse<ITaskData[]>> => {
  const response = await get<IFetchTaskResponse<ITaskData[]>>(`/task`);
  return response;
};

const fetchUserTasks = async (type: Itype, status: Istatus): Promise<IFetchTaskResponse<any[]>> => {
  const response = await get<IFetchTaskResponse<any[]>>(`/usertask/usertasks/filter?status=${status}&type=${type}`);
  return response;
};

const createTask = async (payload: any): Promise<IFetchTaskResponse<ITaskData>> => {
  const response = await post<IFetchTaskResponse<ITaskData>>("/task/tasks", payload);
  return response;
};




export const useFetchAllTasks = () => {
  return useQuery<IFetchTaskResponse<ITaskData[]>, Error>({
    queryKey: [`tasks`],
    queryFn: fetchAllTasks,
  });
};


export const useFetchUserTasks = (type: Itype, status: Istatus) => {
  return useQuery<IFetchTaskResponse<ITaskData[]>, Error>({
    queryKey: [`tasks`, type, status],
    queryFn: () => fetchUserTasks(type, status),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<IFetchTaskResponse<ITaskData>, Error, any>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tasks`] });

      // console.log("Task created successfully: ", data);
      // You might want to show a success toast message here
    },
    onError: (error) => {
      console.error("Failed to create task: ", error);
      // You might want to show an error toast message here
    },
  });
};
