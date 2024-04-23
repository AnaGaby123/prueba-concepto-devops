/* tslint:disable */
import { QueryResultVOcPartidaDetalle } from './query-result-voc-partida-detalle';
export interface GroupQueryResultVOcPartidaDetalle {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultVOcPartidaDetalle};
  TotalGroups?: number;
}
