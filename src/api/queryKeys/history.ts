/**
 * Centralized query keys for SpaceX History
 */
export const historyQueryKeys = {
  all: ["history"] as const,
  list: () => [...historyQueryKeys.all, "list"] as const,
  byId: (id: string) => [...historyQueryKeys.all, "byId", id] as const,
  query: (query: object) => [...historyQueryKeys.all, "query", query] as const,
};
