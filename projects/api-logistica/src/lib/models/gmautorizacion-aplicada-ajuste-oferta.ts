/* tslint:disable */
import { CotPartidasAjusteOferta } from './cot-partidas-ajuste-oferta';
import { AjOfCondicionesdePagoCotizacion } from './aj-of-condicionesde-pago-cotizacion';
import { AjOfFleteExpressCotizacion } from './aj-of-flete-express-cotizacion';
import { AjOfPrecioCotizacion } from './aj-of-precio-cotizacion';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from './aj-of-valor-configuracion-tiempo-entrega-cotizacion';
import { CotCotizacionFleteExpress } from './cot-cotizacion-flete-express';
export interface GMAutorizacionAplicadaAjusteOferta {
  ListaCotPartidasAjusteOferta?: Array<CotPartidasAjusteOferta>;
  ajOfCondicionesdePagoCotizacion?: AjOfCondicionesdePagoCotizacion;
  ajOfFleteExpressCotizacion?: AjOfFleteExpressCotizacion;
  ajOfPrecioCotizacion?: AjOfPrecioCotizacion;
  ajOfValorConfiguracionTiempoEntregaCotizacion?: AjOfValorConfiguracionTiempoEntregaCotizacion;
  cotCotizacionFleteExpress?: CotCotizacionFleteExpress;
}
