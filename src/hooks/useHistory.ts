import { useQuery } from "@tanstack/react-query";
import type { HistoryEvent } from "../types/History";
import type {
  ServiceError,
  SpaceXApiQuery,
  PaginatedResponse,
} from "../types/Api";
import { historyQueryKeys } from "../api/queryKeys/history";
import { SpaceXHistoryService } from "../api/services/history.service";

/**
 * Hook to fetch all history events.
 */
export function useAllHistory() {
  return useQuery<HistoryEvent[] | ServiceError>({
    queryKey: historyQueryKeys.list(),
    queryFn: () => SpaceXHistoryService.getHistory(),
    staleTime: 1000 * 60 * 10, // cache for 10 mins
    gcTime: 1000 * 60 * 30, // garbage collect after 30 mins
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch a single history event by ID.
 */
export function useHistoryById(id: string) {
  return useQuery<HistoryEvent | ServiceError>({
    queryKey: historyQueryKeys.byId(id),
    queryFn: () => SpaceXHistoryService.getHistoryById(id),
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

/**
 * Hook to query history events with filters, sorting, and pagination.
 */
export function useQueryHistory(query: SpaceXApiQuery) {
  return useQuery<PaginatedResponse<HistoryEvent> | ServiceError>({
    queryKey: historyQueryKeys.query(query),
    queryFn: () => SpaceXHistoryService.queryHistory(query),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}
