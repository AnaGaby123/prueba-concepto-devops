/* tslint:disable */
import { Bounds } from './bounds';
import { Leg } from './leg';
import { Overview_Polyline } from './overview-_polyline';
export interface Route {
  bounds?: Bounds;
  copyrights?: string;
  legs?: Array<Leg>;
  overview_polyline?: Overview_Polyline;
  summary?: string;
  warnings?: Array<{}>;
  waypoint_order?: Array<{}>;
}
