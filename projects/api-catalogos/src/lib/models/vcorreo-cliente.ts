/* tslint:disable */
export interface VCorreoCliente {
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
  LeidoAnalistaDeCuentasPorCobrar?: boolean;
  LeidoCoordinadordeServicioAlCliente?: boolean;
  LeidoESAC?: boolean;
  LeidoEVE?: boolean;
  LeidoEVI?: boolean;
  Nombre?: string;
  ProcesadoAnalistaDeCuentasPorCobrar?: boolean;
  ProcesadoCoordinadordeServicioAlCliente?: boolean;
  ProcesadoESAC?: boolean;
  ProcesadoEVE?: boolean;
  ProcesadoEVI?: boolean;
  SinCredito?: boolean;
}
