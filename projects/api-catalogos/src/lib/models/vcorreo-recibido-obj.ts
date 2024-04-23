/* tslint:disable */
import { GMCorreoRecibidoClienteEstatus } from './gmcorreo-recibido-cliente-estatus';
export interface VCorreoRecibidoObj {
  Activo?: boolean;
  Alias?: string;
  ArchivosAdjuntos?: number;
  Asunto?: string;
  ClaveMonedaFacturacion?: string;
  ClaveMonedaTramitacion?: string;
  ClienteNuevo?: boolean;
  Contenido?: string;
  CorreoEmisor?: string;
  CorreosReceptores?: string;
  FacturaPHS?: boolean;
  FechaRecepcion?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCliente?: string;
  IdCorreoRecibido?: string;
  IdCorreoRecibidoContenido?: string;
  IdentificadorCorreo?: string;
  Leido?: boolean;
  ListaGMCorreoRecibidoClienteEstatus?: Array<GMCorreoRecibidoClienteEstatus>;
  ManejaOcInterna?: boolean;
  Nombre?: string;
  SinCredito?: boolean;
}
