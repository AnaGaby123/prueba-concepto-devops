/* tslint:disable */
import { Marca } from './marca';
import { Proveedor } from './proveedor';
import { TiposDePartidas } from './tipos-de-partidas';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
import { CotCotizacionFleteExpress } from './cot-cotizacion-flete-express';
import { CotPartidaCotizacionDetalle } from './cot-partida-cotizacion-detalle';
export interface AjusteFleteExpressPartidaObj {
  Marca?: Marca;
  Proveedor?: Proveedor;
  TiposDePartidas?: TiposDePartidas;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
  cotCotizacionFleteExpress?: CotCotizacionFleteExpress;
  listaCotPartidaCotizacionDetalles?: Array<CotPartidaCotizacionDetalle>;
}
