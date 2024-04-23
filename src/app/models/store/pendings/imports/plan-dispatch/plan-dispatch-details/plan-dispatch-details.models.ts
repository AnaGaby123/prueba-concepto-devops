/* Models Imports */
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {IProvider} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {QueryResultVPDImpListaArriboPartidaDetalle, VImpOrdenDespachoDetalle} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IPlanDispatchDetails {
  steps: Array<BarActivityOption>;
  selectedStep: number;
  selectedProvider: IProvider;
  dispatchOrdersList: Array<IDispatchOrder>;
  dispatchOrdersStatus: number;
  stepsState: IPlanDispatchSteps;
}

export interface IDispatchOrder extends VImpOrdenDespachoDetalle {
  Index?: number;
  IdAgenteAduanal?: string;
}

export interface IPlanDispatchSteps {
  providersSearchTerm: string;
  selectedDispatchOrder: IDispatchOrder;
  providersList: Array<IProvider>;
  needsToReloadProviders: boolean;
  providersStatus: number;
  selectedProvider: IProvider;
  arrivalListGroup: IGroupArrivalList;
  arrivalListGroupStatus: number;
}

export interface IPlanDispatchArrivalListTotals {
  TotalPieces?: number;
  Amount?: number;
}

export interface IGroupArrivalList {
  GroupColumn?: string;
  Groups?: Array<IQueryResultVPDImpListaArriboPartidaDetalle>;
  TotalGroups?: number;
  TotalArrivalList?: number;
}

export interface IQueryResultVPDImpListaArriboPartidaDetalle
  extends QueryResultVPDImpListaArriboPartidaDetalle {
  NombreProveedor?: string;
  NumeroDePiezas?: number;
  TotalUSD?: number;
  FechaEstimadaEntrega?: string;
  Index?: number;
  IsOpen?: boolean;
}

export const initialIPlanDispatchDetails = (): IPlanDispatchDetails => ({
  steps: [
    {
      id: 1,
      label: 'Ajustes de importación',
    },
    {
      id: 2,
      label: 'Consolidado',
    },
    {
      id: 3,
      label: 'Documentación',
      image: 'assets/Images/close-offer/warning.svg',
    },
    {
      id: 4,
      label: 'Generar Orden',
    },
  ],
  selectedStep: 0,
  selectedProvider: null,
  dispatchOrdersList: [],
  dispatchOrdersStatus: API_REQUEST_STATUS_DEFAULT,
  stepsState: initialIPlanDispatchSteps(),
});
export const initialIPlanDispatchSteps = (): IPlanDispatchSteps => ({
  providersSearchTerm: '',
  selectedDispatchOrder: initialIDispatchOrder(),
  providersList: [],
  needsToReloadProviders: true,
  providersStatus: API_REQUEST_STATUS_DEFAULT,
  selectedProvider: null,
  arrivalListGroup: null,
  arrivalListGroupStatus: API_REQUEST_STATUS_DEFAULT,
});
export const initialIDispatchOrder = (): IDispatchOrder => ({
  Activo: true,
  Bultos: null,
  Consecutivo: null,
  EmpresaExportador: null,
  EmpresaImportador: null,
  FechaDeEntregaComprometida: null,
  FechaEstimadaDeEntrega: DEFAULT_DATE,
  FechaHoraEstimadaArribo: DEFAULT_DATE,
  FechaHoraEstimadaSalidaAduana: DEFAULT_DATE,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Folio: null,
  GuiaDeEmbarque: null,
  IdAduana: null,
  IdArchivoCajaAbierta: null,
  IdArchivoCajaAbiertaRegistrarArribo: null,
  IdArchivoEvidencia: null,
  IdArchivoPedimento: null,
  IdCatIncoterm: null,
  IdCatFletera: null,
  IdEmpresaExportador: null,
  IdEmpresaImportador: null,
  IdImpOrdenDespacho: DEFAULT_UUID,
  IdSolicitudAutorizacionCambioComprador: null,
  IdSolicitudAutorizacionCambioSeguridad: null,
  IdUsuarioComprador: null,
  MontoTotalUSD: null,
  NumeroPedimento: null,
  NumeroReferencia: null,
  PackingListAmbos: false,
  PackingListDetallado: false,
  PackingListSimplificado: false,
  PesoKg: null,
  Programada: null,
  Registrada: null,
  TipoDeCambio: null,
  Urgente: null,
  IdAgenteAduanal: null,
});
