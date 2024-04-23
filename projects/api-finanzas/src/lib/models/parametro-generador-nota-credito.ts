/* tslint:disable */
import { ParametroGeneradorNotaCreditoPartida } from './parametro-generador-nota-credito-partida';
export interface ParametroGeneradorNotaCredito {
  IdTPProformaPedido?: string;
  Partidas?: Array<ParametroGeneradorNotaCreditoPartida>;
}
