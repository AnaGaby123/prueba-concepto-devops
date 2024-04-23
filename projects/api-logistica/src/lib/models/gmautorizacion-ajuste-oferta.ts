/* tslint:disable */
import { GMAutorizacionAplicadaAjusteOferta } from './gmautorizacion-aplicada-ajuste-oferta';
import { GMRechazoAutorizacionAjusteOferta } from './gmrechazo-autorizacion-ajuste-oferta';
import { CotCotizacion } from './cot-cotizacion';
export interface GMAutorizacionAjusteOferta {
  GMAutorizacionAplicadaAjusteOferta?: Array<GMAutorizacionAplicadaAjusteOferta>;
  GMRechazoAutorizacionAjusteOferta?: GMRechazoAutorizacionAjusteOferta;
  cotCotizacion?: CotCotizacion;
}
