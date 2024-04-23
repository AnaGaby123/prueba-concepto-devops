/* tslint:disable */
import { VOcPartida } from './voc-partida';
export interface ProveedorOcPartidaPackingListObj {
  IdOcPackingList?: string;
  IdProveedor?: string;
  NombreProveedor?: string;
  PiezasPorArribar?: number;
  listaVOcPartida?: Array<VOcPartida>;
}
