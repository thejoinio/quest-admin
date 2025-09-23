/* eslint-disable @typescript-eslint/no-explicit-any */

export type Itype = "hot" | "normal";
export type Istatus = "completed" | "ongoing" | "inspired" | "open" | "inprogress" | "submitted" | "claimed" | "rejected" | "expired" | "locked" | null | undefined;

export interface IFetchTaskResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ITaskParticipant = {
  id: string,
  email: string,
  username: string,
  avatar: string,
  country: string,
  isAdmin: boolean, // is_admin
  isActive: boolean, // is_active
  isBanned: boolean, // is_banned
  referralCode: string,
  referredById: string, // referred_by_id
  socialLinks: any[],
  referrer: any,
  referralStats: {
    referralLink: string,
    totalReferrals: number,
    referralPoints: number,
    referredUsers: any[]
  }
}

export type ITaskData = {
  id: string,
  title: string,
  description: string,
  pointsReward: number, // points_reward
  type: string,
  proofType: { // proof_type
    link: string,
  },
  metadata: {
    link: string,
    description?: string,
    taskPlatform?: string,
    image?: string[],
  },
  expirationTimestamp: string, // expiration_timestamp
  cooldownPeriodHours: string | number, // cooldown_period_hours
  maxParticipants: number, // max_participants
  isHot: true, // is_hot
  isActive: true, // is_active
  userId: string, // user_id

  isLocked: boolean, // is_locked
  userStatus: string, // user_status
  ongoingCount: number, // ongoing_count
  participantProfiles: ITaskParticipant[], // participant_profiles

  createdAt: string,
  updatedAt: string,
}
