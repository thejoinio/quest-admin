export interface IFetchProfileResponse {
  success: boolean;
  message: string;
  data: IProfileData;
}

export interface IProfileData {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  country: string;
  isAdmin: boolean; // no longer being sent by the backend
  isActive: boolean;
  isBanned: boolean;
  referralCode: string;
  referredById: string; // null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deletedAt: any;
  userPoint: {
    totalPoints: number;
    currentTier: string;
    acknowledgedTier: string;
  };
  dailyClaimStreak: number;
  role: "regular" | "ambassador" | "kol" | "admin";
  lastDailyClaim: string; // null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socialLinks: any; // [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  referrer: any; // null,
  referralStats: {
    referralLink: string; // null,
    totalReferrals: number;
    referralPoints: number;

    referredUsers: Array<{
      username: string;
      totalPoints: number;
    }>; // []
  };
  hasNewRank: boolean;
}

export interface IReferralStats {
  referralLink: string | null;
  totalReferrals: number;
  referralPoints: number;
  referredUsers: IReferredUsers[] | null;
}

export interface IReferredUsers {
  id: string;
  username: string;
  country: string;
  totalPoints: number;
}

export interface IPatchProfilePayload {
  username?: string;
  avatar?: string;
  wallet?: string;
  country?: string;
  socialLinks?: string[];
}

export interface IFetchResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ILeaderboardData {
  position: number;
  totalPoints: number;
  currentStreak: number;
  currentTier: string;
  username: string;
  avatar: string;
  country: string;
}

export interface ILeaderboard {
  success: boolean;
  message: string;
  data: ILeaderboardData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
