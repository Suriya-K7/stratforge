import type { ServiceError } from "../../types/Api";

/**
 * Logs standardized service errors in a consistent format.
 *
 * @param service - Name of the service class (e.g., "SpaceXLaunchService").
 * @param action - Description of the failed action (e.g., "fetch all launches").
 * @param details - Extra contextual details (endpoint, query, etc.).
 * @param error - The caught error instance.
 * @returns A standardized ServiceError object.
 */
export function logServiceError(
  service: string,
  action: string,
  details: Record<string, unknown>,
  error: unknown
): ServiceError {
  const status = error.response?.status;

  console.error(`[${service}] Failed to ${action}`, {
    ...details,
    status,
    error: error.message ?? error,
  });

  return {
    message: `Failed to ${action}`,
    error,
    status,
    endpoint: String(details.endpoint),
  };
}
