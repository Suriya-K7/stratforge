/**
 * Represents a SpaceX launch event.
 *
 * Fields include:
 * - `id`: Unique identifier of the launch (MongoDB ObjectId)
 * - `name`: Mission name (e.g., "FalconSat")
 * - `flight_number`: Sequential flight number
 * - `date_utc`: UTC date/time of the launch
 * - `date_unix`: Launch time as a Unix timestamp
 * - `date_local`: Local launch date/time
 * - `date_precision`: Precision of the launch date ("hour", "day", etc.)
 * - `upcoming`: Whether the launch is scheduled for the future
 * - `static_fire_date_utc`: UTC static fire test date/time, or `null`
 * - `static_fire_date_unix`: Unix static fire test timestamp, or `null`
 * - `net`: Whether the launch date is "No Earlier Than" (NET)
 * - `window`: Duration of the launch window in seconds, or `null`
 * - `rocket`: Rocket ID
 * - `launchpad`: Launchpad ID
 * - `payloads`: IDs of payloads carried
 * - `capsules`: IDs of capsules involved
 * - `ships`: IDs of ships supporting the launch
 * - `crew`: IDs of crew members
 * - `links`: Related links (patches, webcast, press kit, etc.)
 * - `fairings`: Fairing recovery details, or `null`
 * - `cores`: Information about rocket cores used
 * - `success`: Whether the launch was successful, or `null`
 * - `failures`: Details of failures, if any
 * - `details`: Additional mission details, or `null`
 * - `auto_update`: Whether SpaceX auto-updates launch data
 * - `tbd`: Whether launch date/time is TBD
 * - `launch_library_id`: Launch Library ID, or `null`
 *
 * Documentation:
 * https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v4/all.md
 */
export type Launch = {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "half" | "quarter" | "year" | "month" | "day" | "hour";
  upcoming: boolean;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number | null;
  rocket: string;
  launchpad: string;
  payloads: string[];
  capsules: string[];
  ships: string[];
  crew: string[];
  links: LaunchLinks;
  fairings: Fairings | null;
  cores: Core[];
  success: boolean | null;
  failures: Failure[];
  details: string | null;
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
};

/**
 * Information about rocket fairings used in a launch.
 *
 * Fields include:
 * - `reused`: Whether the fairings were reused
 * - `recovery_attempt`: Whether a recovery attempt was made
 * - `recovered`: Whether the fairings were recovered
 * - `ships`: IDs of ships involved in recovery
 */
export type Fairings = {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
};

/**
 * Links related to a SpaceX launch (patches, media, articles, etc.).
 *
 * Fields include:
 * - `patch`: Mission patch images (small/large)
 * - `reddit`: Reddit threads (campaign, launch, media, recovery)
 * - `flickr`: Flickr image links (small/original)
 * - `presskit`: Press kit document URL
 * - `webcast`: SpaceX webcast URL
 * - `youtube_id`: YouTube video ID
 * - `article`: News article URL
 * - `wikipedia`: Wikipedia page URL
 */
export type LaunchLinks = {
  patch: {
    small: string | null;
    large: string | null;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
};

/**
 * Details of a failure event during a launch.
 *
 * Fields include:
 * - `time`: Seconds after liftoff when failure occurred
 * - `altitude`: Altitude at the time, or `null`
 * - `reason`: Reason for the failure
 */
export type Failure = {
  time: number;
  altitude: number | null;
  reason: string;
};

/**
 * Information about a rocket core used in a launch.
 *
 * Fields include:
 * - `core`: Core ID, or `null`
 * - `flight`: Flight number of the core, or `null`
 * - `gridfins`: Whether the core had grid fins
 * - `legs`: Whether the core had landing legs
 * - `reused`: Whether the core was reused
 * - `landing_attempt`: Whether a landing attempt was made
 * - `landing_success`: Whether the landing succeeded
 * - `landing_type`: Landing type (e.g., "ASDS", "RTLS"), or `null`
 * - `landpad`: Landing pad ID, or `null`
 */
export type Core = {
  core: string | null;
  flight: number | null;
  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
};
