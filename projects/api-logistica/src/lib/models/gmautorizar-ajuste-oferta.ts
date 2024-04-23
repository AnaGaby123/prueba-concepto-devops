/* tslint:disable */
import { AjustesOferta } from './ajustes-oferta';
import { AjOfRechazo } from './aj-of-rechazo';
export interface GMAutorizarAjusteOferta {
  AjustesOferta?: Array<AjustesOferta>;
  IdCotCotizacion?: string;
  ajOfRechazo?: AjOfRechazo;
}
