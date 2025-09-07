import { logServiceError } from "../../lib/utils";
import type {
  SpaceXApiQuery,
  ServiceError,
  PaginatedResponse,
} from "../../types/api";
import type { HistoryEvent } from "../../types/History";
import spacexClient from "../clients/spacexClient";

/**
 * Service layer for interacting with the SpaceX History API endpoints.
 *
 * Provides methods to fetch all history events, fetch a single event by ID,
 * and query history events with filters, sorting, and pagination.
 *
 * @author [Suriya](https://github.com/suriya-k7)
 */
export class SpaceXHistoryService {
  private static service = "SpaceXHistoryService";

  /**
   * Fetch all SpaceX historical events.
   *
   * @logic Makes a GET request to `/history`.
   *
   * @returns {Promise<HistoryEvent[] | ServiceError>}
   * List of history events or a service error.
   *
   * @example
   * const history = await SpaceXHistoryService.getHistory();
   */
  static async getHistory(): Promise<HistoryEvent[] | ServiceError> {
    const endpoint = "/history";
    try {
      const { data } = await spacexClient.get<HistoryEvent[]>(endpoint);
      return data;
    } catch (error: unknown) {
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
   *
   * @logic Makes a GET request to `/history/:id`.
   *
   * @param {string} id - The history event ID.
   * @returns {Promise<HistoryEvent | ServiceError>}
   * History event details or a service error.
   *
   * @example
   * const event = await SpaceXHistoryService.getHistoryById("5f6fb2d0d4d898000604b388");
   */
  static async getHistoryById(
    id: string
  ): Promise<HistoryEvent | ServiceError> {
    const endpoint = `/history/${id}`;
    try {
      const { data } = await spacexClient.get<HistoryEvent>(endpoint);
      return data;
    } catch (error: unknown) {
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
   *
   * @logic Makes a POST request to `/history/query` with a Mongo-style query object.
   *
   * @param {SpaceXApiQuery} query - Mongo-style query object (filters, sort, pagination).
   * @returns {Promise<PaginatedResponse<HistoryEvent> | ServiceError>}
   * Paginated history events response or a service error.
   *
   * @example
   * const events = await SpaceXHistoryService.queryHistory({
   *   query: { title: /Falcon/i },
   *   options: { limit: 5, sort: { event_date_utc: "desc" } }
   * });
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
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "query history",
        { endpoint, query },
        error
      );
    }
  }
}
