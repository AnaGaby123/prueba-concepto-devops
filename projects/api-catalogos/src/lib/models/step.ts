/* tslint:disable */
import { Distance1 } from './distance-1';
import { Duration1 } from './duration-1';
import { End_Location1 } from './end-_location-1';
import { Polyline } from './polyline';
import { Start_Location1 } from './start-_location-1';
export interface Step {
  distance?: Distance1;
  duration?: Duration1;
  end_location?: End_Location1;
  html_instructions?: string;
  maneuver?: string;
  polyline?: Polyline;
  start_location?: Start_Location1;
  travel_mode?: string;
}
