/* tslint:disable */
import { TupleCotCotizacionFleteExpressAjOfFleteExpressCotizacion } from './tuple-cot-cotizacion-flete-express-aj-of-flete-express-cotizacion';
import { AjOfPrecioCotizacion } from './aj-of-precio-cotizacion';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from './aj-of-valor-configuracion-tiempo-entrega-cotizacion';
import { AjOfCondicionesdePagoCotizacion } from './aj-of-condicionesde-pago-cotizacion';
import { AjOfRazonRechazo } from './aj-of-razon-rechazo';
import { AjOfRechazo } from './aj-of-rechazo';
export interface AjusteOfertaMasivoCotizacionParametro {
  ListaAjOfFleteExpressCotizacion?: Array<TupleCotCotizacionFleteExpressAjOfFleteExpressCotizacion>;
  ListaAjOfPrecioCotizacion?: Array<AjOfPrecioCotizacion>;
  ListaAjOfValorConfiguracionTiempoEntregaCotizacion?: Array<AjOfValorConfiguracionTiempoEntregaCotizacion>;
  ajOfCondicionesdePagoCotizacion?: AjOfCondicionesdePagoCotizacion;
  ajOfRazonRechazo?: AjOfRazonRechazo;
  ajOfRechazo?: AjOfRechazo;
}
