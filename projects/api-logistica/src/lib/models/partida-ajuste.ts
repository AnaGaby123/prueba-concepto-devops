/* tslint:disable */
import { AjOfPrecioCotizacion } from './aj-of-precio-cotizacion';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from './aj-of-valor-configuracion-tiempo-entrega-cotizacion';
export interface PartidaAjuste {
  IdcotPartidaCotizacion?: string;
  ajOfPrecioCotizacion?: AjOfPrecioCotizacion;
  ajOfValorConfiguracionTiempoEntregaCotizacion?: AjOfValorConfiguracionTiempoEntregaCotizacion;
}
