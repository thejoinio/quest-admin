import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IFetchProfileResponse, ILeaderboard, IPatchProfilePayload } from "../definitions/profile";
import { fetchLeaderboard, fetchProfile, updateProfile } from "../endpoints/dashboard/profile";
import { QUERY_KEYS } from "../queryKeys";
import { toast } from "sonner";
import { TError } from "@/types/errorType";
import { post } from "../axios";


export const useFetchProfile = () => {
  return useQuery<IFetchProfileResponse, Error>({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: fetchProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<IFetchProfileResponse, TError, IPatchProfilePayload>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      toast.success(data.message || "Profile updated successfully", { description: "" });

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

export const useFetchLeaderboard = (page: number, limit: number) => {
  return useQuery<ILeaderboard, Error>({
    queryKey: [QUERY_KEYS.LEADERBOARD, page, limit],
    queryFn: () => fetchLeaderboard(page, limit),
  });
};

const acknowledgeRank = async () => {
  const response = await post("/profile/acknowledge-rank");
  return response;
};

export const useAcknowledgeRank = () => {
  return useMutation({
    mutationFn: acknowledgeRank,
  });
};