/* tslint:disable */
import { GMCotFleteExpress } from './gmcot-flete-express';
import { GMCotFleteUltimaMilla } from './gmcot-flete-ultima-milla';
export interface GMCotFletes {
  FleteExpress?: GMCotFleteExpress;
  FletesUltimaMilla?: Array<GMCotFleteUltimaMilla>;
}
