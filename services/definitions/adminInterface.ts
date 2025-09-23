export interface ICreateUserPayload {
  name: string;
  email: string;
  role: string;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// DASHBOARD
export interface IAdminDashboardResData {
  status: boolean;
  message: string;
  totalUser: number;
  numberOfActiveUser: number;
  numberofInActiveUser: number;
  numberOfKol: number;
  totalPoint: number;
  weeklyTask: {
    id: string;
    title: string;
    participantCount: number;
  }[];
  allWeekStat: {
    week: number;
    percentage: number;
  }[];
}

interface IOverviewLeaderboard {
  rank: number;
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
  totalPoints: number;
  userTaskCount: string;
  taskStatus: string;
}

export interface IAdminDashboardOverviewLeaderboard {
  status: boolean;
  message: string;
  data: IOverviewLeaderboard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// TASK MANAGEMENT

export interface IAdminTaskManagementResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    pointsReward: number; //points_reward
    type: string;
    // proof_type: {
    proofType: {
      link: string;
    };
    metadata: {
      link: string;
      description: string;
      taskPlatform: string;
    };
    expirationTimestamp: string; // expiration_timestamp
    cooldownPeriodHours: string; // cooldown_period_hours
    maxParticipants: 1; // max_participants
    isHot: boolean; // is_hot
    isActive: boolean; // is_active
    userId: string; // user_id
    createdAt: string;
    updatedAt: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type IAdminCreateTaskPayload = {
  title: string;
  description: string;
  pointsReward: number; // points_reward
  type: string;
  proofTypeRequirement: { // proof_type_requirement
    link: boolean;
    image: boolean;
  };
  metadata: {
    link: string;
    description: string;
    taskPlatform: string;
  };
  expirationTimestamp: string; // expiration_timestamp
  cooldownPeriodHours: string; // cooldown_period_hours
  maxParticipants: string; // max_participants
  endDate: string; // end_date
};

export interface IAdminCreateTaskResData {
  id: string;
  isHot: boolean; // is_hot
  isActive: boolean; // is_active
  title: string;
  description: string;
  pointsReward: number; // points_reward
  type: string;
  proofType: { // proof_type
    link: string;
  };
  metadata: {
    link: string;
    description: string;
    taskPlatform: string;
  };
  expirationTimestamp: string; // expiration_timestamp
  maxParticipants: number; // max_participants
  userId: string; // user_id
  updatedAt: string;
  createdAt: string;
  cooldownPeriodHours: number; // cooldown_period_hours
}

// USERS MANAGEMENT
export interface IAdminUsersResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    // username: string,
    // avatar: string,
    // country: string,
    role: string;
    isActive: boolean; // is_active
    isBanned: boolean; // is_banned
    // referralCode: string,
    // referred_by_id: string
    userPoint: {
      totalPoints: number;
      currentTier: string; // current_tier
    };
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IAdminSingleUserTasksResponse {
  userId: string; // user_id
  taskId: string; // task_id
  status: string;
  proofSubmission: string; // proof_submission
  claimedAt: string; // claimed_at
  submittedAt: string; // submitted_at
  completedAt: string; // completed_at
  rejectionReason: string; // rejection_reason
  task: { title: string };
  createdAt: string;
  updatedAt: string;
}

export interface IAdminSingleUserResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  country: string;
  role: string;
  isActive: boolean; // is_active
  isBanned: boolean; // is_banned
  referralCode: string;
  referredById: string | null; // referred_by_id

  createdAt: string;
  completedTasksCount: string | number;
  userTasks: IAdminSingleUserTasksResponse[];
  userPoint: {
    totalPoints: number;
    currentTier: string; // current_tier
  };
}

export interface IAdminFetchUserTaskHistory {
  status: boolean;
  message: string;
  data: IAdminSingleUserTasksResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface profileUpdateResponse {
  status: boolean;
  message: string;
}
