export interface IFetchDashboardResponse {
  status: string;
  message: string;
  data: IFetchDashboardData;
}

export interface IFetchDashboardData {
  totalEnrollees: number; // total_enrollees
  childrenDependants: number; // children_dependants
  spouses: number;
  hcps: number;
  plans: IFetchDashboardPlans;
}

export interface IFetchDashboardPlans {
  formal_sector: number;
  informal_personal: number;
  informal_tiship: number;
  informal_family: number;
  informal_adoption: number;
  bhcpf: number;
  global_fund: number;
}

