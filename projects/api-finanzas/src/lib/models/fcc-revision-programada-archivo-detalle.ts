/* tslint:disable */
import { Archivo } from './archivo';
import { TpProformaPedido } from './tp-proforma-pedido';
export interface FccRevisionProgramadaArchivoDetalle {
  Activo?: boolean;
  ArchivosEvidenciaMensajero?: Array<Archivo>;
  ArchivosEvidenciaRevision?: Array<Archivo>;
  ComentariosAdicionales?: string;
  Consecutivo?: number;
  Digital?: boolean;
  FechaProgramacionCobroCalculada?: string;
  FechaRealizada?: string;
  FechaRegistro?: string;
  FechaRevision?: string;
  FechaUltimaActualizacion?: string;
  Fisica?: boolean;
  Folio?: string;
  Hibrida?: boolean;
  IdCatPrioridad?: string;
  IdDireccionCliente?: string;
  IdFCCRevisionProgramada?: string;
  IdTPProformaPedido?: string;
  IdUsuarioDestino?: string;
  IdUsuarioOrigen?: string;
  Prioridad?: string;
  Publicada?: boolean;
  Realizada?: boolean;
  tpProformaPedido?: TpProformaPedido;
}
