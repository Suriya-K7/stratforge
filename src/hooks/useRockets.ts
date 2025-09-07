import { useQuery } from "@tanstack/react-query";
import type { Rocket } from "../types/Rocket";
import type {
  ServiceError,
  SpaceXApiQuery,
  PaginatedResponse,
} from "../types/Api";
import { SpaceXRocketService } from "../api/services/rocket.service";
import { rocketQueryKeys } from "../api/queryKeys/rocket";

/**
 * Hook to fetch all rockets.
 */
export function useAllRockets() {
  return useQuery<Rocket[] | ServiceError>({
    queryKey: rocketQueryKeys.list(),
    queryFn: () => SpaceXRocketService.getAllRockets(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch a rocket by ID.
 */
export function useRocketById(id: string) {
  return useQuery<Rocket>({
    queryKey: rocketQueryKeys.byId(id),
    queryFn: () => SpaceXRocketService.getRocketById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

/**
 * Hook to query rockets with filters, sorting, and pagination.
 */
export function useQueryRockets(query: SpaceXApiQuery) {
  return useQuery<PaginatedResponse<Rocket> | ServiceError>({
    queryKey: rocketQueryKeys.query(query),
    queryFn: () => SpaceXRocketService.queryRockets(query),
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}
