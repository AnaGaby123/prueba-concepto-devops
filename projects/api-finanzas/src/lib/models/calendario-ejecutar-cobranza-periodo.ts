/* tslint:disable */
import { CalendarioEjecutarCobranzaDia } from './calendario-ejecutar-cobranza-dia';
export interface CalendarioEjecutarCobranzaPeriodo {
  ACobrar?: number;
  CalendarioEjecutarCobranzaDia?: Array<CalendarioEjecutarCobranzaDia>;
  Cobrado?: number;
  CobroNoRecibido?: number;
  Cobros?: number;
  EnRevision?: number;
  EnTiempo?: number;
  FechaFin?: string;
  FechaInicio?: string;
  SinMonitoreo?: number;
}
