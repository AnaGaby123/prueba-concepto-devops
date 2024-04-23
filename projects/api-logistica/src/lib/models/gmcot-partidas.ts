/* tslint:disable */
import { CotPartidaCotizacion } from './cot-partida-cotizacion';
import { CotProductoOferta } from './cot-producto-oferta';
import { CotPartidaCotizacionCapacitacionFecha } from './cot-partida-cotizacion-capacitacion-fecha';
export interface GMCotPartidas {
  CotPartidaCotizacion?: CotPartidaCotizacion;
  CotProductoOferta?: CotProductoOferta;
  IdCatRutaEntrega?: string;
  fechasRealizacionCapacitacion?: Array<CotPartidaCotizacionCapacitacionFecha>;
}
