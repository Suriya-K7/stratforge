/**
 * Represents a SpaceX rocket.
 *
 * Fields include:
 * - `id`: Unique ID for the rocket
 * - `name`: Rocket name (e.g., "Falcon 1")
 * - `type`: Rocket type (e.g., "rocket")
 * - `active`: Whether the rocket is active
 * - `stages`: Number of stages
 * - `boosters`: Number of boosters
 * - `cost_per_launch`: Cost per launch in USD
 * - `success_rate_pct`: Success rate percentage (0–100)
 * - `first_flight`: First flight date (YYYY-MM-DD)
 * - `country`: Country of origin
 * - `company`: Manufacturing company
 * - `wikipedia`: Link to Wikipedia
 * - `description`: Description of the rocket
 * - `flickr_images`: Flickr image URLs
 * - `height`, `diameter`: Rocket dimensions
 * - `mass`: Rocket mass
 * - `first_stage`: First stage details
 * - `second_stage`: Second stage details
 * - `engines`: Engine details
 * - `landing_legs`: Landing legs information
 * - `payload_weights`: Payload weight capacities
 *
 * Source: https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets/v4/all.md
 */
export type Rocket = {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  flickr_images: string[];
  height: Dimension;
  diameter: Dimension;
  mass: Mass;
  first_stage: StageFirst;
  second_stage: StageSecond;
  engines: Engine;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
};

/**
 * Represents a dimension in meters and feet.
 */
export type Dimension = {
  meters: number | null;
  feet: number | null;
};

/**
 * Represents rocket mass in kilograms and pounds.
 */
export type Mass = {
  kg: number;
  lb: number;
};

/**
 * Represents the first stage of a rocket.
 */
export type StageFirst = {
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number | null;
};

/**
 * Represents the second stage of a rocket.
 */
export type StageSecond = {
  thrust: Thrust;
  payloads: PayloadOptions;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number | null;
};

/**
 * Represents engine specifications.
 */
export type Engine = {
  isp: ISP;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  number: number;
  type: string;
  version: string;
  layout: string | null;
  engine_loss_max: number | null;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
};

/**
 * Represents rocket landing legs.
 */
export type LandingLegs = {
  number: number;
  material: string | null;
};

/**
 * Represents payload weight capacity.
 */
export type PayloadWeight = {
  id: string;
  name: string;
  kg: number;
  lb: number;
};

/**
 * Represents payload options, such as fairings.
 */
export type PayloadOptions = {
  composite_fairing: {
    height: Dimension;
    diameter: Dimension;
  };
  option_1: string;
};

/**
 * Represents specific impulse (ISP) values.
 */
export type ISP = {
  sea_level: number;
  vacuum: number;
};

/**
 * Represents thrust values in kilonewtons (kN) and pounds-force (lbf).
 */
export type Thrust = {
  kN: number;
  lbf: number;
};
