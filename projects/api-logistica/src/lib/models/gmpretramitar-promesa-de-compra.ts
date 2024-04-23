/* tslint:disable */
import { GMPartidaPromesaDeCompra } from './gmpartida-promesa-de-compra';
import { PpPedido } from './pp-pedido';
export interface GMPretramitarPromesaDeCompra {
  EsFleteDesglosado?: boolean;
  IdPcPromesaDeCompra?: string;
  IdsCotCotizacionFleteExpress?: Array<string>;
  IdsCotCotizacionFleteUltimaMilla?: Array<string>;
  Observaciones?: string;
  PartidasPromesaDeCompra?: Array<GMPartidaPromesaDeCompra>;
  Pedido?: PpPedido;
  TieneObservaciones?: boolean;
}
