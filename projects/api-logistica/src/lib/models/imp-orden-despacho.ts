/* tslint:disable */
export interface ImpOrdenDespacho {
  Activo?: boolean;
  AcuseReciboGenerado?: boolean;
  Bultos?: number;
  ComentariosIncidencia?: string;
  Consecutivo?: number;
  FechaDeEntregaComprometida?: boolean;
  FechaEstimadaDeEntrega?: string;
  FechaHoraEstimadaArribo?: string;
  FechaHoraEstimadaSalidaAduana?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
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
  Ingresada?: boolean;
  MontoTotalUSD?: number;
  NumeroPedimento?: string;
  NumeroReferencia?: string;
  PackingListAmbos?: boolean;
  PackingListDetallado?: boolean;
  PackingListSimplificado?: boolean;
  PesoKg?: number;
  Programada?: boolean;
  Registrada?: boolean;
  TipoDeCambio?: number;
  Urgente?: boolean;
}
