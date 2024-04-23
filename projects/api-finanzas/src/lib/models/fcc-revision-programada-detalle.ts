/* tslint:disable */
import { VUsuario } from './vusuario';
export interface FccRevisionProgramadaDetalle {
  Activo?: boolean;
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
  UsuarioDestino?: VUsuario;
  UsuarioOrigen?: VUsuario;
}
