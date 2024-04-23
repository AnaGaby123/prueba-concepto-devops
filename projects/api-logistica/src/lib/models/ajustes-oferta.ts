/* tslint:disable */
import { AjOfCondicionesdePagoCotizacion } from './aj-of-condicionesde-pago-cotizacion';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
import { AjOfPrecioCotizacion } from './aj-of-precio-cotizacion';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from './aj-of-valor-configuracion-tiempo-entrega-cotizacion';
export interface AjustesOferta {
  ajOfCondicionesdePagoCotizacion?: AjOfCondicionesdePagoCotizacion;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
  ajOfPrecioCotizacion?: AjOfPrecioCotizacion;
  ajOfValorConfiguracionTiempoEntregaCotizacion?: AjOfValorConfiguracionTiempoEntregaCotizacion;
}
