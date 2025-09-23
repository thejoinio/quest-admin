import { get, post } from "@/services/axios";

export interface startFarmingResponse {
  success: boolean;
  message: string;
  data: {
    startTime: string; // start_time
    claimAvailable: string; // claim_available
  }
}

export const startFarming = async (): Promise<startFarmingResponse> => {
  const response = await post<startFarmingResponse>("/farming/start");
  return response;
};



export interface farmingStatusResponse {
  success: boolean;
  data: {
    active: boolean;
    startTime: string; // start_time
    claimAvailable: string; // claim_available
    canClaim: boolean; // can_claim
    currentStreak: number; // current_streak
  };
}
export const fetchFarmingStatus = async (): Promise<farmingStatusResponse> => {
  const response = await get<farmingStatusResponse>("/farming/status");
  return response;
};

export const claimFarming = async (): Promise<startFarmingResponse> => {
  const response = await post<startFarmingResponse>("/farming/claim");
  return response;
};
