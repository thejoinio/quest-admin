import { get, patch } from "@/services/axios";
import { IFetchProfileResponse, ILeaderboard, IPatchProfilePayload } from "@/services/definitions/profile";

export const fetchProfile = async (): Promise<IFetchProfileResponse> => {
  const response = await get<IFetchProfileResponse>("/profile");
  return response;
};

export const updateProfile = async (payload: IPatchProfilePayload): Promise<IFetchProfileResponse> => {
  const response = await patch<IFetchProfileResponse>("/profile/update", payload);
  return response;
};

export const fetchLeaderboard = async (page: number, limit: number): Promise<ILeaderboard> => {
  const response = await get<ILeaderboard>("/leaderboard", { page, limit });
  return response;
};