/* tslint:disable */
import { Distance } from './distance';
import { Duration } from './duration';
import { End_Location } from './end-_location';
import { Start_Location } from './start-_location';
import { Step } from './step';
export interface Leg {
  distance?: Distance;
  duration?: Duration;
  end_address?: string;
  end_location?: End_Location;
  start_address?: string;
  start_location?: Start_Location;
  steps?: Array<Step>;
  traffic_speed_entry?: Array<{}>;
  via_waypoint?: Array<{}>;
}
