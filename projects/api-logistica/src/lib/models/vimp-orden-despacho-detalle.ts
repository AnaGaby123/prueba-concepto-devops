/* tslint:disable */
import { Aduana } from './aduana';
import { AgenteAduanal } from './agente-aduanal';
export interface VImpOrdenDespachoDetalle {
  Activo?: boolean;
  AcuseReciboGenerado?: boolean;
  Aduana?: Aduana;
  AgenteAduanal?: AgenteAduanal;
  Bultos?: number;
  ComentariosIncidencia?: string;
  Consecutivo?: number;
  EmpresaExportador?: string;
  EmpresaImportador?: string;
  FechaDeEntregaComprometida?: boolean;
  FechaEstimadaDeEntrega?: string;
  FechaHoraEstimadaArribo?: string;
  FechaHoraEstimadaSalidaAduana?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Fletera?: string;
  Folio?: string;
  GuiaDeEmbarque?: string;
  IdAduana?: string;
  IdArchivoAcuseReciboFirmado?: string;
  IdArchivoCajaAbierta?: string;
  IdArchivoCajaAbiertaRegistrarArribo?: string;
  IdArchivoEvidencia?: string;
  IdArchivoPedimento?: string;
  IdCatFletera?: string;
  IdCatIncoterm?: string;
  IdEmpresaExportador?: string;
  IdEmpresaImportador?: string;
  IdImpOrdenDespacho?: string;
  IdSegVisitaVisitante?: string;
  IdSolicitudAutorizacionCambioComprador?: string;
  IdSolicitudAutorizacionCambioSeguridad?: string;
  IdUsuarioComprador?: string;
  Incidencia?: boolean;
  Incoterm?: string;
  Ingresada?: boolean;
  MontoTotalUSD?: number;
  NombreComercial?: string;
  NumeroPedimento?: string;
  NumeroReferencia?: string;
  PackingListAmbos?: boolean;
  PackingListDetallado?: boolean;
  PackingListSimplificado?: boolean;
  PesoKg?: number;
  Programada?: boolean;
  Registrada?: boolean;
  TipoDeCambio?: number;
  TotalImpListaArribo?: number;
  TotalUSD?: number;
  Urgente?: boolean;
}
