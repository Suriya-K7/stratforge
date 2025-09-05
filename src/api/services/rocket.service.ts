import type { SpaceXApiQuery, ServiceError } from "../../types/api";
import type { Rocket } from "../../types/rocket";
import type { PaginatedResponse } from "../../types/api";
import spacexClient from "../clients/spacexClient";
import { logServiceError } from "../../lib/utils";

/**
 * Service layer for interacting with the SpaceX Rockets API endpoints.
 */
export class SpaceXRocketService {
  private static service = "SpaceXRocketService";

  /**
   * Fetch all rockets.
   */
  static async getAllRockets(): Promise<Rocket[] | ServiceError> {
    const endpoint = "/rockets";
    try {
      const { data } = await spacexClient.get<Rocket[]>(endpoint);
      return data;
    } catch (error: any) {
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
   * @param id - The rocket ID
   */
  static async getRocketById(id: string): Promise<Rocket | ServiceError> {
    const endpoint = `/rockets/${id}`;
    try {
      const { data } = await spacexClient.get<Rocket>(endpoint);
      return data;
    } catch (error: any) {
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
   * @param query - Mongo-style query object
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
    } catch (error: any) {
      return logServiceError(
        this.service,
        "query rockets",
        { endpoint, query },
        error
      );
    }
  }
}
