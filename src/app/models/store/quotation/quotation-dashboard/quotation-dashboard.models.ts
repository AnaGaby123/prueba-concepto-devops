import {QuotationClientInfo} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {
  IItemQuotationResearch,
  IItemQuotationWithProduct,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  Archivo,
  AttributeDashboard,
  CorreoRecibidoClienteRequerimientoObj,
  CotCotizacionFleteExpressDetalle,
  Resumen,
} from 'api-logistica';

export interface QuotationDashboardState {
  tabOptionsApi?: Array<AttributeDashboard>;
  tabOptions: Array<ITabOption>;
  selectedTabOption: ITabOption;
  typeFilterOptions: DropListOption[];
  selectedTypeFilterOption: DropListOption;
  selectedDateFilterOption: IFilterDate;
  searchTypeOptions: DropListOption[];
  selectedSearchTypeOption: DropListOption;
  searchTerm: string;
  totalClients: number;
  totalQuotes: number;
  totalTypeTotal: number;
  totalTypePartial: number;
  clientsList: Array<ClientsListItemForQuotation>;
  clientsListRequestStatus: number;
  mailDetailStatus: number;
}

export interface ClientsListItemForQuotation extends Resumen {
  Index: number;
  IdCliente?: string;
  Nombre?: string;
  NivelIngreso?: string;
  Categoria?: string;
  Total?: number;
  EstadoCotizacionNueva?: number;
  EstadoCotizacionGuardada?: number;
  EstadoCotizacionEnviada?: number;
  TipoCotizacionTotal?: number;
  TipoCotizacionParcial?: number;
  ProductoDisponible?: string;
  ProductoNoDisponible?: string;
  Sugerencias?: string;
  quotesDetails?: Array<IClientQuotesDetails>;
}

export interface IClientQuotes {
  IdCliente?: string;
  NivelIngreso?: string;
  Nombre?: string;
  TotalCotizaciones?: number;
  TotalNuevas?: number;
  TotalGuardadas?: number;
  TotalEnviadas?: number;
  Index?: number;
  quotesDetails?: Array<IClientQuotesDetails>;
}

export interface IClientQuotesDetails {
  Folio?: string;
  EstadoCotizacion?: string;
  FechaCotizacion?: string;
  IdCatEstadoCotizacion?: string;
  IdCatNivelIngreso?: string;
  IdCatTipoCotizacion?: string;
  IdContacto?: string;
  IdCotCotizacion?: string;
  IdCatCondicionesDePagoDeOrigen?: string;
  IdCatMoneda?: string;
  IdDatosFacturacionCliente?: string;
  IdDireccion?: string;
  IdUsuarioTramita?: string;
  Piezas?: number;
  TipoCotizacion?: string;
  TotalArchivos?: number;
  TotalCotizado?: number;
  TotalProductos?: number;
  TotalControlados?: number;
  TotalNoControlados?: number;
  subtotalFlete?: number;
  subtotalIVA?: number;
  subtotalPartidas?: number;
  IdCliente?: string;
  IdContactoCliente?: string;
  DiasDePagoDeOrigen?: number;
  DiasDePagoAdicionalesDeOrigen?: number;
  IdCatCondicionesDePago?: string;
  DiasDePagoAdicionales?: number;
  IdEmpresa?: string;
  IdArchivo?: string;
  IdCatZona?: string;
  IdFlete?: string;
  Enviado?: boolean;
  Ajustada?: boolean;
  FechaCaducidad?: string;
  FechaEnvio?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdSolicitudAutorizacionCambio?: string;
  Activo?: boolean;
  AgregarDatosFacturacion?: boolean;
  ComentarioFlete?: string;
  FleteDesglosado?: boolean;
  montoFlete?: number;
  isSelected?: boolean;
  /* Persistir las partidas de cotizaciones */
  needsToReloadItemsQuotation?: boolean;
  itemsQuotation?: Array<IItemQuotationWithProduct>;
  /* Persistir los datos generales de la cotización */
  needsToReloadGeneralData?: boolean;
  generalData?: QuotationClientInfo;
  /* Persistir los productos en linea y fuera de linea */
  needsToReloadOffLineProducts?: boolean;
  offLineProducts?: Array<IItemQuotationResearch>;
  /* Persistir el correo electrónico */
  mailData?: CorreoRecibidoClienteRequerimientoObj;
  needsToReloadMailData?: boolean;
  freights?: Array<CotCotizacionFleteExpressDetalle>;
}

export interface ISingleQuotationDetails {
  Folio?: string;
  EstadoCotizacion?: string;
  FechaCotizacion?: string;
  IdCatEstadoCotizacion?: string;
  IdCatNivelIngreso?: string;
  IdCatTipoCotizacion?: string;
  IdContacto?: string;
  IdCotCotizacion?: string;
  IdCatCondicionesDePagoDeOrigen?: string;
  IdCatMoneda?: string;
  IdDatosFacturacionCliente?: string;
  IdDireccion?: string;
  IdUsuarioTramita?: string;
  Piezas?: number;
  TipoCotizacion?: string;
  TotalArchivos?: number;
  TotalCotizado?: number;
  TotalProductos?: number;
  TotalControlados?: number;
  TotalNoControlados?: number;
  subtotalFlete?: number;
  subtotalIVA?: number;
  subtotalPartidas?: number;
  IdCliente?: string;
  IdContactoCliente?: string;
  DiasDePagoDeOrigen?: number;
  DiasDePagoAdicionalesDeOrigen?: number;
  IdCatCondicionesDePago?: string;
  DiasDePagoAdicionales?: number;
  IdEmpresa?: string;
  IdArchivo?: string;
  IdCatZona?: string;
  IdFlete?: string;
  Enviado?: boolean;
  Ajustada?: boolean;
  FechaCaducidad?: string;
  FechaEnvio?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdSolicitudAutorizacionCambio?: string;
  Activo?: boolean;
  AgregarDatosFacturacion?: boolean;
  ComentarioFlete?: string;
  FleteDesglosado?: boolean;
  montoFlete?: number;
  isSelected?: boolean;
}

export interface IClientQuotesTotals {
  clients: Array<IClientQuotes>;
  totalNew: number;
  totalSaved: number;
  totalSent: number;
  totalTypeParcial?: number;
  totalTypeTotal?: number;
}

//TODO: EL MODULO DEL COTIZADOR YA NO LO OCUPA, SE MANTIENE PORQUE EN OTROS MODULOS SI
export interface IMail {
  subject: string;
  mails: Array<Archivo>;
  IdCorreoRecibido: string;
  content: string;
  sender: string;
}
