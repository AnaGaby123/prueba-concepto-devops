/* tslint:disable */
import { Geocoded_Waypoints } from './geocoded-_waypoints';
import { Route } from './route';
export interface DirectionsPqfObj {
  TotalDistanceInKm?: number;
  geocoded_waypoints?: Array<Geocoded_Waypoints>;
  routes?: Array<Route>;
  status?: string;
}
