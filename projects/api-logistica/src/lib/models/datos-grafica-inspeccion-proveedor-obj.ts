/* tslint:disable */
import { ProveedorInspeccionPartidaObj } from './proveedor-inspeccion-partida-obj';
export interface DatosGraficaInspeccionProveedorObj {
  Arribados?: boolean;
  Monto?: number;
  Piezas?: number;
  ProveedorInspeccionPartida?: Array<ProveedorInspeccionPartidaObj>;
}
