/* tslint:disable */
import { GMCotPartidasDetalle } from './gmcot-partidas-detalle';
import { VProducto } from './vproducto';
export interface CotPartidaCotizacionDetalle {
  CotizacionesVinculadas?: number;
  gMCotPartidasDetalle?: GMCotPartidasDetalle;
  vProducto?: VProducto;
  vProductoSuplementarios?: Array<VProducto>;
}
