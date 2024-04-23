/* tslint:disable */
import { CotPartidaCotizacion } from './cot-partida-cotizacion';
import { CotProductoOferta } from './cot-producto-oferta';
import { VPartidaCotizacion } from './vpartida-cotizacion';
import { VProducto } from './vproducto';
import { CotPartidaCotizacionCapacitacionFecha } from './cot-partida-cotizacion-capacitacion-fecha';
export interface GMCotPartidasDetalle {
  CotPartidaCotizacion?: CotPartidaCotizacion;
  CotProductoOferta?: CotProductoOferta;
  IdCatRutaEntrega?: string;
  VPartidaCotizacion?: VPartidaCotizacion;
  VProducto?: VProducto;
  fechasRealizacionCapacitacion?: Array<CotPartidaCotizacionCapacitacionFecha>;
}
