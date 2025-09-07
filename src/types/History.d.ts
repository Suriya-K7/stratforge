/**
 * Represents a SpaceX historical event or milestone.
 *
 * Fields include:
 * - `id`: Unique ID for the event
 * - `title`: Event title (e.g., "Falcon reaches Earth orbit")
 * - `details`: Description of the event
 * - `event_date_utc`: UTC date/time of the event (ISO string)
 * - `event_date_unix`: Unix timestamp of the event
 * - `links`: Related external links
 *
 * Source: https://github.com/r-spacex/SpaceX-API/blob/master/docs/history/v4/all.md
 */
export type HistoryEvent = {
  id: string;
  title: string;
  details: string;
  event_date_utc: string;
  event_date_unix: number;
  links: HistoryLinks;
};

/**
 * Links related to a SpaceX historical event.
 *
 * Fields include:
 * - `article`: Related article URL, or `null` if unavailable
 */
export type HistoryLinks = {
  article: string | null;
};
