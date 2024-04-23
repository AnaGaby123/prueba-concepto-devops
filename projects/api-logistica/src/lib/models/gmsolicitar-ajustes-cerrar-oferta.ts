/* tslint:disable */
import { PartidaAjuste } from './partida-ajuste';
import { AjOfCondicionesdePagoCotizacion } from './aj-of-condicionesde-pago-cotizacion';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
export interface GMSolicitarAjustesCerrarOferta {
  IdCotCotizacion?: string;
  IdProveedor?: string;
  Justificion?: string;
  ListaPartidaAjuste?: Array<PartidaAjuste>;
  ajOfCondicionesdePagoCotizacion?: AjOfCondicionesdePagoCotizacion;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
}
