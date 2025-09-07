/**
 * Centralized query keys for SpaceX launches
 */
export const launchQueryKeys = {
  all: ["launches"] as const,
  list: () => [...launchQueryKeys.all, "list"] as const,
  latest: () => [...launchQueryKeys.all, "latest"] as const,
  next: () => [...launchQueryKeys.all, "next"] as const,
  past: () => [...launchQueryKeys.all, "past"] as const,
  upcoming: () => [...launchQueryKeys.all, "upcoming"] as const,
  byId: (id: string) => [...launchQueryKeys.all, "byId", id] as const,
  query: (query: Record<string, unknown>) =>
    [...launchQueryKeys.all, "query", query] as const,
};
