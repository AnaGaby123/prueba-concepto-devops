/* tslint:disable */
import { CotCotizacion } from './cot-cotizacion';
import { GMCotPartidas } from './gmcot-partidas';
import { CotCotizacionFleteExpress } from './cot-cotizacion-flete-express';
import { CotCotizacionFleteUltimaMilla } from './cot-cotizacion-flete-ultima-milla';
export interface GMCotCotizacion {
  CostoFletes?: number;
  CotCotizacion?: CotCotizacion;
  CotPartidasCotizacion?: Array<GMCotPartidas>;
  Subtotal?: number;
  Total?: number;
  cotCotizacionFleteExpress?: Array<CotCotizacionFleteExpress>;
  cotCotizacionFletesUltimaMilla?: Array<CotCotizacionFleteUltimaMilla>;
}
