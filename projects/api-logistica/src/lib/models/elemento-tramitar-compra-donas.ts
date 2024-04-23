/* tslint:disable */
import { ElementoTramitarCompraDonasUnitario } from './elemento-tramitar-compra-donas-unitario';
export interface ElementoTramitarCompraDonas {
  Elementos?: Array<ElementoTramitarCompraDonasUnitario>;
  NumeroDePiezas?: number;
  Productos?: number;
  Total?: number;
  ValorTotalUSD?: number;
}
