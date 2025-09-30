import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

/**
 * Configuration for retry logic
 */
export type RetryConfig = {
  retries: number;
  retryDelay: number;
  retryCondition?: (error: AxiosError) => boolean;
};

/**
 * Extended Axios request config with retry configuration
 */
export type ExtendedAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _retryCount?: number;
  retryConfig?: RetryConfig;
};

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status <= 599) ||
      error.code === "ECONNABORTED" ||
      error.code === "ERR_NETWORK"
    );
  },
};

/**
 * Error types for better error handling
 */
export const ErrorType = {
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  CLIENT_ERROR: "CLIENT_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

/**
 * Standardized error response structure
 */
export type StandardErrorResponse = {
  type: ErrorType;
  message: string;
  statusCode?: number;
  originalError?: AxiosError;
  data?: unknown;
};

/**
 * Determines the error type based on the axios error
 */
const getErrorType = (error: AxiosError): ErrorType => {
  if (!error.response) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return ErrorType.TIMEOUT_ERROR;
    }
    return ErrorType.NETWORK_ERROR;
  }

  const status = error.response.status;

  switch (status) {
    case 401:
      return ErrorType.UNAUTHORIZED;
    case 403:
      return ErrorType.FORBIDDEN;
    case 404:
      return ErrorType.NOT_FOUND;
    case 422:
      return ErrorType.VALIDATION_ERROR;
    default:
      if (status >= 400 && status < 500) {
        return ErrorType.CLIENT_ERROR;
      }
      if (status >= 500) {
        return ErrorType.SERVER_ERROR;
      }
      return ErrorType.UNKNOWN_ERROR;
  }
};

/**
 * Creates a standardized error response
 */
const createStandardError = (error: AxiosError): StandardErrorResponse => {
  const errorType = getErrorType(error);
  const statusCode = error.response?.status;
  const responseData = error.response?.data;

  let message = "An unexpected error occurred";

  switch (errorType) {
    case ErrorType.NETWORK_ERROR:
      message = "Network error. Please check your internet connection.";
      break;
    case ErrorType.TIMEOUT_ERROR:
      message = "Request timeout. Please try again.";
      break;
    case ErrorType.SERVER_ERROR:
      message = "Server error. Please try again later.";
      break;
    case ErrorType.UNAUTHORIZED:
      message = "Unauthorized. Please login again.";
      break;
    case ErrorType.FORBIDDEN:
      message = "Access forbidden. You don't have permission to access this resource.";
      break;
    case ErrorType.NOT_FOUND:
      message = "Resource not found.";
      break;
    case ErrorType.VALIDATION_ERROR:
      message = "Validation error. Please check your input.";
      break;
    case ErrorType.CLIENT_ERROR:
      message = "Bad request. Please check your input.";
      break;
  }

  // Try to extract a more specific message from the response
  if (responseData && typeof responseData === "object") {
    const data = responseData as Record<string, unknown>;
    if (typeof data.message === "string") {
      message = data.message;
    } else if (typeof data.error === "string") {
      message = data.error;
    } else if (typeof data.detail === "string") {
      message = data.detail;
    }
  }

  return {
    type: errorType,
    message,
    statusCode,
    originalError: error,
    data: responseData,
  };
};

/**
 * Calculates exponential backoff delay
 */
const calculateRetryDelay = (retryCount: number, baseDelay: number): number => {
  return Math.min(baseDelay * Math.pow(2, retryCount), 10000); // Max 10 seconds
};

/**
 * Setup request interceptor
 */
const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add timestamp to track request duration
      (config as ExtendedAxiosRequestConfig)._retry = false;

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          {
            params: config.params,
            data: config.data,
          }
        );
      }

      // Add authorization token if available
      const token = localStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      console.error("[Request Interceptor Error]", error);
      return Promise.reject(error);
    }
  );
};

/**
 * Setup response interceptor with retry logic
 */
const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(
          `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
          {
            status: response.status,
            data: response.data,
          }
        );
      }

      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as ExtendedAxiosRequestConfig;

      if (!config) {
        return Promise.reject(createStandardError(error));
      }

      // Get retry configuration (use default if not provided)
      const retryConfig = config.retryConfig || DEFAULT_RETRY_CONFIG;
      const currentRetryCount = config._retryCount || 0;

      // Check if we should retry
      const shouldRetry =
        !config._retry &&
        currentRetryCount < retryConfig.retries &&
        retryConfig.retryCondition?.(error);

      if (shouldRetry) {
        config._retry = true;
        config._retryCount = currentRetryCount + 1;

        // Calculate delay with exponential backoff
        const delay = calculateRetryDelay(
          currentRetryCount,
          retryConfig.retryDelay
        );

        console.warn(
          `[Retry Attempt ${config._retryCount}/${retryConfig.retries}] ${config.method?.toUpperCase()} ${config.url} - Retrying in ${delay}ms`
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Retry the request
        return instance(config);
      }

      // Create standardized error
      const standardError = createStandardError(error);

      // Log error
      console.error("[API Error]", {
        type: standardError.type,
        message: standardError.message,
        statusCode: standardError.statusCode,
        url: config.url,
        method: config.method,
      });

      // Handle specific error types
      switch (standardError.type) {
        case ErrorType.UNAUTHORIZED:
          // Clear auth token and redirect to login
          localStorage.removeItem("authToken");
          // Optionally dispatch a logout action or redirect
          // window.location.href = '/login';
          break;

        case ErrorType.FORBIDDEN:
          // Optionally redirect to forbidden page
          break;

        case ErrorType.NOT_FOUND:
          // Optionally redirect to 404 page
          break;
      }

      return Promise.reject(standardError);
    }
  );
};

/**
 * Setup all interceptors for an Axios instance
 *
 * @param instance - The Axios instance to setup interceptors for
 * @param retryConfig - Optional retry configuration (uses defaults if not provided)
 *
 * @example
 * ```ts
 * import axios from 'axios';
 * import { setupAxiosInterceptors } from './interceptors/axiosInterceptor';
 *
 * const client = axios.create({
 *   baseURL: 'https://api.example.com',
 * });
 *
 * setupAxiosInterceptors(client, {
 *   retries: 3,
 *   retryDelay: 1000,
 * });
 * ```
 */
export const setupAxiosInterceptors = (
  instance: AxiosInstance,
  retryConfig?: Partial<RetryConfig>
): void => {
  // Store retry config on instance for later use
  if (retryConfig) {
    const mergedConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    (instance as AxiosInstance & { _retryConfig?: RetryConfig })._retryConfig = mergedConfig;
  }

  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
};

/**
 * Create a new Axios instance with interceptors pre-configured
 *
 * @param config - Axios request configuration
 * @param retryConfig - Optional retry configuration
 * @returns Configured Axios instance
 *
 * @example
 * ```ts
 * import { createAxiosInstance } from './interceptors/axiosInterceptor';
 *
 * const client = createAxiosInstance({
 *   baseURL: 'https://api.example.com',
 *   timeout: 10000,
 * }, {
 *   retries: 5,
 *   retryDelay: 2000,
 * });
 * ```
 */
export const createAxiosInstance = (
  config: AxiosRequestConfig,
  retryConfig?: Partial<RetryConfig>
): AxiosInstance => {
  const instance = axios.create(config);
  setupAxiosInterceptors(instance, retryConfig);
  return instance;
};

// Export utilities
export { DEFAULT_RETRY_CONFIG };