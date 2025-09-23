import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { QUERY_KEYS } from "../queryKeys";
import { toast } from "sonner";
import { TError } from "@/types/errorType";
import {
  startFarming, startFarmingResponse,
  fetchFarmingStatus, farmingStatusResponse,
  claimFarming,
} from "../endpoints/dashboard/farming";
import { QUERY_KEYS } from "../queryKeys";


export const useStartFarming = () => {
  const queryClient = useQueryClient();

  return useMutation<startFarmingResponse, TError>({
    mutationFn: startFarming,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: ["user", "farming-status"] });
      toast.success(data.message || "Farming started successfully", { description: "" });

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

export const useFetchFarmingStatus = () => {
  return useQuery<farmingStatusResponse, Error>({
    queryKey: ["user", "farming-status"],
    queryFn: fetchFarmingStatus,
  });
};

export const useClaimFarming = () => {
  const queryClient = useQueryClient();

  return useMutation<startFarmingResponse, TError>({
    mutationFn: claimFarming,
    onSuccess: (data) => {
      // console.log(data);

      queryClient.invalidateQueries({ queryKey: ["user", "farming-status"] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      toast.success(data.message || "Farming started successfully", { description: "" });

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


