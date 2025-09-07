import { logServiceError } from "../../lib/utils";
import type { ServiceError } from "../../types/api";
import type { Launch } from "../../types/Launch";
import spacexClient from "../clients/spacexClient";

export type LaunchQuery = {
  query: Record<string, unknown>;
  options?: Record<string, unknown>;
};

export type LaunchQueryResponse = {
  docs: Launch[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
};

/**
 * Service layer for interacting with the SpaceX Launches API endpoints.
 *
 * Provides methods to fetch all launches, latest/next launches,
 * past/upcoming launches, and query launches with filters, sorting,
 * and pagination.
 *
 * @author [Suriya](https://github.com/suriya-k7)
 */
export class SpaceXLaunchService {
  private static service = "SpaceXLaunchService";

  /**
   * Fetch all launches.
   *
   * @logic Makes a GET request to `/launches`.
   *
   * @returns {Promise<Launch[] | ServiceError>} List of launches or service error.
   *
   * @example
   * const launches = await SpaceXLaunchService.getAllLaunches();
   */
  static async getAllLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch all launches",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch the latest launch.
   *
   * @logic Makes a GET request to `/launches/latest`.
   *
   * @returns {Promise<Launch | ServiceError>} Latest launch details or service error.
   *
   * @example
   * const latest = await SpaceXLaunchService.getLatestLaunch();
   */
  static async getLatestLaunch(): Promise<Launch | ServiceError> {
    const endpoint = "/launches/latest";
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch latest launch",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch the next scheduled launch.
   *
   * @logic Makes a GET request to `/launches/next`.
   *
   * @returns {Promise<Launch | ServiceError>} Next launch details or service error.
   *
   * @example
   * const next = await SpaceXLaunchService.getNextLaunch();
   */
  static async getNextLaunch(): Promise<Launch | ServiceError> {
    const endpoint = "/launches/next";
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch next launch",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch a launch by ID.
   *
   * @logic Makes a GET request to `/launches/:id`.
   *
   * @param {string} id - Launch ID.
   * @returns {Promise<Launch | ServiceError>} Launch details or service error.
   *
   * @example
   * const launch = await SpaceXLaunchService.getLaunchById("5eb87d46ffd86e000604b388");
   */
  static async getLaunchById(id: string): Promise<Launch | ServiceError> {
    const endpoint = `/launches/${id}`;
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        `fetch launch with id=${id}`,
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch past launches.
   *
   * @logic Makes a GET request to `/launches/past`.
   *
   * @returns {Promise<Launch[] | ServiceError>} Past launches or service error.
   *
   * @example
   * const past = await SpaceXLaunchService.getPastLaunches();
   */
  static async getPastLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches/past";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch past launches",
        { endpoint },
        error
      );
    }
  }

  /**
   * Fetch upcoming launches.
   *
   * @logic Makes a GET request to `/launches/upcoming`.
   *
   * @returns {Promise<Launch[] | ServiceError>} Upcoming launches or service error.
   *
   * @example
   * const upcoming = await SpaceXLaunchService.getUpcomingLaunches();
   */
  static async getUpcomingLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches/upcoming";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);

      const response = data.filter((item) => item.links.patch.small !== null);

      return response;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "fetch upcoming launches",
        { endpoint },
        error
      );
    }
  }

  /**
   * Query launches with filters, sorting, and pagination.
   *
   * @logic Makes a POST request to `/launches/query` with a Mongo-style query object.
   *
   * @param {LaunchQuery} query - Mongo-style query object with filters/options.
   * @returns {Promise<LaunchQueryResponse | ServiceError>}
   * Paginated launches or service error.
   *
   * @example
   * const launches = await SpaceXLaunchService.queryLaunches({
   *   query: { success: true },
   *   options: { limit: 10, sort: { date_utc: "desc" } }
   * });
   */
  static async queryLaunches(
    query: LaunchQuery
  ): Promise<LaunchQueryResponse | ServiceError> {
    const endpoint = "/launches/query";
    try {
      const { data } = await spacexClient.post<LaunchQueryResponse>(
        endpoint,
        query
      );
      return data;
    } catch (error: unknown) {
      return logServiceError(
        this.service,
        "query launches",
        { endpoint, query },
        error
      );
    }
  }
}
