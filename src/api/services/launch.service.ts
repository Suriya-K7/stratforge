import { logServiceError } from "../../lib/utils";
import type { ServiceError } from "../../types/api";
import type { Launch } from "../../types/launch";
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
 */
export class SpaceXLaunchService {
  private static service = "SpaceXLaunchService";

  static async getAllLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch all launches",
        { endpoint },
        error
      );
    }
  }

  static async getLatestLaunch(): Promise<Launch | ServiceError> {
    const endpoint = "/launches/latest";
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch latest launch",
        { endpoint },
        error
      );
    }
  }

  static async getNextLaunch(): Promise<Launch | ServiceError> {
    const endpoint = "/launches/next";
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch next launch",
        { endpoint },
        error
      );
    }
  }

  static async getLaunchById(id: string): Promise<Launch | ServiceError> {
    const endpoint = `/launches/${id}`;
    try {
      const { data } = await spacexClient.get<Launch>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        `fetch launch with id=${id}`,
        { endpoint },
        error
      );
    }
  }

  static async getPastLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches/past";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch past launches",
        { endpoint },
        error
      );
    }
  }

  static async getUpcomingLaunches(): Promise<Launch[] | ServiceError> {
    const endpoint = "/launches/upcoming";
    try {
      const { data } = await spacexClient.get<Launch[]>(endpoint);
      return data;
    } catch (error: any) {
      return logServiceError(
        this.service,
        "fetch upcoming launches",
        { endpoint },
        error
      );
    }
  }

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
    } catch (error: any) {
      return logServiceError(
        this.service,
        "query launches",
        { endpoint, query },
        error
      );
    }
  }
}
