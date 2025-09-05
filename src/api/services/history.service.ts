import { logServiceError } from "../../lib/utils";
import type {
  SpaceXApiQuery,
  ServiceError,
  PaginatedResponse,
} from "../../types/api";
import type { HistoryEvent } from "../../types/history";
import spacexClient from "../clients/spacexClient";

/**
 * Service layer for interacting with the SpaceX History API endpoints.
 */
export class SpaceXHistoryService {
  private static service = "SpaceXHistoryService";

  /**
   * Fetch all SpaceX historical events.
   */
  static async getHistory(): Promise<HistoryEvent[] | ServiceError> {
    const endpoint = "/history";
    try {
      const { data } = await spacexClient.get<HistoryEvent[]>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch history",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch a single SpaceX history event by ID.
   * @param id - The history event ID
   */
  static async getHistoryById(
    id: string
  ): Promise<HistoryEvent | ServiceError> {
    const endpoint = `/history/${id}`;
    try {
      const { data } = await spacexClient.get<HistoryEvent>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        `fetch history event id=${id}`,
        { endpoint },
        error
      );
    }
  }

  /**
   * Query SpaceX history events with filters, sorting, and pagination.
   * @param query - Mongo-style query object
   */
  static async queryHistory(
    query: SpaceXApiQuery
  ): Promise<PaginatedResponse<HistoryEvent> | ServiceError> {
    const endpoint = "/history/query";
    try {
      const { data } = await spacexClient.post<PaginatedResponse<HistoryEvent>>(
        endpoint,
        query
      );
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "query history",
        { endpoint, query },
        error
      );
    }
  }
}
