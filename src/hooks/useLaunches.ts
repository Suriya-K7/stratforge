import { useQuery } from "@tanstack/react-query";
import type { Launch } from "../types/Launch";
import type { ServiceError } from "../types/Api";
import { launchQueryKeys } from "../api/queryKeys/launches";
import {
  SpaceXLaunchService,
  type LaunchQuery,
  type LaunchQueryResponse,
} from "../api/services/launch.service";

/**
 * Hook to fetch a single launch by ID.
 */
export function useLaunchById(id: string) {
  return useQuery<Launch | ServiceError>({
    queryKey: launchQueryKeys.byId(id),
    queryFn: () => SpaceXLaunchService.getLaunchById(id),
    enabled: !!id, // only fetch if id exists
  });
}

/**
 * Hook to query launches with filters, sorting, and pagination.
 */
export function useQueryLaunches(query: LaunchQuery) {
  return useQuery<LaunchQueryResponse | ServiceError>({
    queryKey: launchQueryKeys.query(query),
    queryFn: () => SpaceXLaunchService.queryLaunches(query),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch all upcoming launches.
 */
export function useUpcomingLaunches() {
  return useQuery<Launch[] | ServiceError>({
    queryKey: launchQueryKeys.upcoming(),
    queryFn: () => SpaceXLaunchService.getUpcomingLaunches(),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
