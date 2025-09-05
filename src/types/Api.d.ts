/**
 * Type definition for a SpaceX API query request.
 *
 * Fields include:
 * - `query`: A Mongo-style filter object
 * - `options.limit`: Maximum number of documents per page
 * - `options.page`: Page number (for pagination)
 * - `options.sort`: Sort order for fields (e.g., { flight_number: "asc" })
 * - `options.select`: Fields to return (array of field names)
 *
 * Reference:
 * https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
 */
export type SpaceXApiQuery = {
  query?: Record<string, unknown>;
  options?: {
    limit?: number;
    page?: number;
    sort?: Record<string, "asc" | "desc" | 1 | -1>;
    select?: string[];
  };
};

/**
 * Standardized error response used across SpaceX service layers.
 *
 * Fields include:
 * - `message`: Human-readable error message
 * - `error`: Original error object or value
 * - `status`: Optional HTTP status code, if available
 * - `endpoint`: API endpoint where the error occurred
 */
export type ServiceError = {
  message: string;
  error: unknown;
  status?: number;
  endpoint: string;
};

/**
 * Generic paginated query response returned by SpaceX API endpoints.
 *
 * Fields include:
 * - `docs`: Array of documents of type `T`
 * - `totalDocs`: Total number of documents available
 * - `limit`: Number of documents returned per page
 * - `totalPages`: Total number of available pages
 * - `page`: Current page number
 * - `pagingCounter`: Index of the first document on this page (1-based)
 * - `hasPrevPage`: Whether a previous page exists
 * - `hasNextPage`: Whether a next page exists
 * - `prevPage`: Previous page number, or `null` if none
 * - `nextPage`: Next page number, or `null` if none
 */
export type PaginatedResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};
