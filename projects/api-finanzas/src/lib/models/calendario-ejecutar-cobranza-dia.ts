/* tslint:disable */
import { VFacturaClienteCalendarioTotales } from './vfactura-cliente-calendario-totales';
export interface CalendarioEjecutarCobranzaDia {
  ACobrar?: number;
  Cobrado?: number;
  CobroNoRecibido?: number;
  Cobros?: number;
  EnRevision?: number;
  EnTiempoVerde?: number;
  Fecha?: string;
  ListaClientes?: Array<VFacturaClienteCalendarioTotales>;
  Morosa?: number;
  Pagada?: number;
  SinMonitoreo?: number;
  VencidaAmarillo?: number;
  VencidaNaranja?: number;
  VencidaRojo?: number;
}
