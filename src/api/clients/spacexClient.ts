import axios, { type AxiosInstance } from "axios";

/**
 * Axios instance configured for the SpaceX REST API (v4).
 *
 * @remarks
 * This client is pre-configured with:
 * - `baseURL` pointing to `https://api.spacexdata.com/v4`
 * - Default `Content-Type` set to `application/json`
 * - A request timeout of 10 seconds
 *
 * It also includes basic request/response interceptors for logging.
 *
 * @example
 * ```ts
 * import spacexClient from "../clients/spacexClient";
 *
 * const response = await spacexClient.get("/rockets");
 * console.log(response.data);
 * ```
 */
const spacexClient: AxiosInstance = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor: logs method and URL
spacexClient.interceptors.request.use(
  (config) => {
    console.log(
      `[SpaceX API Request] ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: logs errors
spacexClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[SpaceX API Error]", error.message);
    return Promise.reject(error);
  }
);

export default spacexClient;
