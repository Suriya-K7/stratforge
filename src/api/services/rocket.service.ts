import type { SpaceXApiQuery, ServiceError } from "../../types/Api";
import type { PaginatedResponse } from "../../types/Api";
import spacexClient from "../clients/spacexClient";
import { logServiceError } from "../../lib/utils";
import type { Rocket } from "../../types/Rocket";

/**
 * Service layer for interacting with the SpaceX Rockets API endpoints.
 *
 * Provides methods to fetch all rockets, a single rocket by ID, or query rockets
 * with filters, pagination, and sorting. Uses `spacexClient` for HTTP requests.
 *
 * @author [Suriya](https://github.com/suriya-k7)
 */
export class SpaceXRocketService {
  private static service = "SpaceXRocketService";

  /**
   * Fetch all rockets.
   *
   * @logic Makes a GET request to `/rockets` endpoint and returns a list of rockets.
   *
   * @returns {Promise<Rocket[] | ServiceError>} List of rockets or a service error.
   *
   * @example
   * const rockets = await SpaceXRocketService.getAllRockets();
   */
  static async getAllRockets(): Promise<Rocket[] | ServiceError> {
    const endpoint = "/rockets";
    try {
      const { data } = await spacexClient.get<Rocket[]>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch all rockets",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch a single rocket by ID.
   *
   * @logic Makes a GET request to `/rockets/:id` endpoint and returns rocket details.
   *
   * @param {string} id - The rocket ID.
   * @returns {Promise<Rocket | ServiceError>} Rocket details or a service error.
   *
   * @example
   * const rocket = await SpaceXRocketService.getRocketById("falcon9");
   */
  static async getRocketById(id: string): Promise<Rocket | ServiceError> {
    const endpoint = `/rockets/${id}`;
    try {
      const { data } = await spacexClient.get<Rocket>(endpoint);

      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        `fetch rocket id=${id}`,
        { endpoint },
        error
      );
    }
  }

  /**
   * Query rockets with filters, sorting, and pagination.
   *
   * @logic Makes a POST request to `/rockets/query` with a Mongo-style query object.
   * Supports filtering, sorting, and pagination.
   *
   * @param {SpaceXApiQuery} query - Mongo-style query object (filter, sort, limit, etc.).
   * @returns {Promise<PaginatedResponse<Rocket> | ServiceError>}
   * Paginated rockets response or a service error.
   *
   * @example
   * const rockets = await SpaceXRocketService.queryRockets({
   *   query: { active: true },
   *   options: { limit: 5, sort: { first_flight: "asc" } }
   * });
   */
  static async queryRockets(
    query: SpaceXApiQuery
  ): Promise<PaginatedResponse<Rocket> | ServiceError> {
    const endpoint = "/rockets/query";
    try {
      const { data } = await spacexClient.post<PaginatedResponse<Rocket>>(
        endpoint,
        query
      );
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "query rockets",
        { endpoint, query },
        error
      );
    }
  }
}
