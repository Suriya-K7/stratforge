/**
 * Centralized query keys for SpaceX Rockets
 */
export const rocketQueryKeys = {
  all: ["rockets"] as const,
  list: () => [...rocketQueryKeys.all, "list"] as const,
  byId: (id: string) => [...rocketQueryKeys.all, "byId", id] as const,
  query: (query: object) => [...rocketQueryKeys.all, "query", query] as const,
};
