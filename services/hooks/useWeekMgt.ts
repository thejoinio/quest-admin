// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
// import { QUERY_KEYS } from "../queryKeys";
// import { toast } from "sonner";
// import { TError } from "@/types/errorType";
import { currentWeek, currentWeekResponse } from "../endpoints/dashboard/weekly";


export const useCurrentWeekStatus = () => {
  return useQuery<currentWeekResponse, Error>({
    queryKey: ["user", "current-week"],
    queryFn: currentWeek,
  });
};

