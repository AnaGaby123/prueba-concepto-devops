/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {
  GMCotFletes,
  GMEstrategia,
  PartidaCotizacionTasaConversionBaseObj,
  QueryInfo,
  TupleDecimalDecimalInt32,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {VCliente, VContacto, VDatosFacturacionCliente} from 'api-catalogos';

/* Models Imports */
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Tools Imports */
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IPopUpData} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {IImageItem} from '@appModels/shared/shared.models';
import {IContentStrategyState} from '@appModels/store/pendings/strategy/strategy-details/details/sections/content-strategy.models';
import {IOfferState} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface StrategyDetailsState {
  selectedClient: IStrategyByClient; // DOCS: El cliente selecccionado desde el dashboard
  selectedQuotation: IQuotation;
  freightSelectedQuote: GMCotFletes;
  itemsQuotationStatus: number;
  generalDataClient: QuotationClientInfo;
  barPercentages?: IEntriesPercentages;
  brandsContract: IBrands; //DOCS: MARCAS CON LAS QUE TIENE CONTRATO
  brandsSelectedQuotation: Array<DropListOption>; // DOCS: MARCAS DE LAS PARTIDAS DE LA COTIZACIÓN SELECCIONADA
  brandSelectedFilter: DropListOption; // DOCS: MARCA SELECCIONADA DE LAS PARTIDAS (FILTRO)
  quotationStrategy: IQuotationStrategyData;
  tabs: ITabs;
  contentStrategySection: IContentStrategyState;
  offerSection: IOfferState;
  quotations: QuotationsList;
  contact: IContact;
  queryInfo: QueryInfo;
  itemsQuotationSelected: IQueryResultIItemQuotation;
}

//DOCS: ARMAR EL CUERPO DE LA ESTRATEGIA

export interface ITactic {
  value: boolean;
  tactic: IQuotationStrategyTactic;
}

export interface ISubTactic {
  value: boolean;
  subTactic: IQuotationStrategySubTactic;
  isMultiSubTactic: boolean;
}

//DOCS: BARRAS DE PORCENTAJE (AHORRO, COMPLEMENTARIAS, ALTERNATIVAS, ORIGINALES, PROMOCION)

export interface IEntriesPercentages {
  Original?: TupleDecimalDecimalInt32;
  Ahorro?: TupleDecimalDecimalInt32;
  Complementaria?: TupleDecimalDecimalInt32;
  Promocion?: TupleDecimalDecimalInt32;
  Alternativa?: TupleDecimalDecimalInt32;
}

//DOCS: INFORMACIÓN DEL CLIENTE

export interface IVClientStrategy extends VCliente, IImageItem {}

//DOCS: INFORMACIÓN DEL CLIENTE

export interface QuotationClientInfo {
  client?: IVClientStrategy;
  contact?: VContacto;
  billingData?: VDatosFacturacionCliente;
  currency?: apiCatalogs.CatMoneda;
  paymentConditions?: apiCatalogs.CatCondicionesDePago;
  user?: apiCatalogs.Usuario;
  address?: apiCatalogs.Direccion;
  deliveryRoute?: apiCatalogs.CatRutaEntrega;
  idQuotation?: string;
}

//DOCS: INTERFACES DE COTIZACIÓN

export interface QuotationsList {
  listQuotesStatus: number;
  quotationsList: Array<IQuotation>;
}

export interface IQuotation extends apiLogistic.VCotCotizacion {
  Index?: number;
  isSelected?: boolean;
  needsToReloadGeneralData?: boolean;
  needsToReloadInfo?: boolean;
  needsToReloadContact?: boolean;
  needsToReloadItemQuotation?: boolean;
}

//DOCS: INTERFACES DE PARTIDAS DE LA COTIZACIÓN SELECCIONADA

export interface IQueryResultIItemQuotation {
  Results?: Array<IItemQuotation>;
  TotalResults?: number;
}

export interface IItemQuotation extends apiLogistic.PartidaCotizacionTasaConversionObj, IImageItem {
  Index?: number;
  popUpByType?: IPopUpData;
  popUpByBrand?: IPopUpData;
  PartidasHijas?: Array<IItemQuotationWithChild>;
  PorcentajeTasasConversionMarca?: number;
  PorcentajeTasasConversionTipo?: number;

  freightItem?: IFreightItem;
}

export interface IItemQuotationWithChild
  extends PartidaCotizacionTasaConversionBaseObj,
    IImageItem {
  IItemQuotation?;
  PorcentajeTasasConversionMarca?: number;
  PorcentajeTasasConversionTipo?: number;
  popUpByType?: IPopUpData;
  popUpByBrand?: IPopUpData;
}

//DOCS: INTERFACES DE MARCAS CON LAS QUE TIENE CONTRATO EL CLIENTE
export interface IBrandWithContract extends apiCatalogs.VMarca {
  Index: number;
}

export interface IBrands {
  listBrands: Array<IBrandWithContract>;
  listBrandsStatus: number;
  needsToReloadBrands: boolean;
}

//DOCS: INTERFACES DE LAS ESTRATEGIAS, TACTICAS Y SUBTACTICAS
export interface IQuotationStrategy {
  listQuotationStrategy: Array<apiCatalogs.CatEstrategiaCotizacion>;
  listQuotationStrategyTactic: Array<apiCatalogs.CatEstrategiaCotizacionTactica>;
  listQuotationStrategyTacticBackup?: Array<apiCatalogs.CatEstrategiaCotizacionTactica>;
  listQuotationStrategySubTactic: Array<apiCatalogs.CatEstrategiaCotizacionSubtactica>;
}

export interface IAjOfEstrategiaCotizacion {
  IdCatEstrategiaCotizacion: string;
  IdUsuarioCreacion: string;
  IdCliente: string;
}

export interface IAjOfEstrategiaCotizacionTactica {
  IdCatEstrategiaCotizacionSubtactica: string | null;
  Justificacion: string;
  IdCatEstrategiaCotizacionTactica: string;
}

export interface IAjOfQuotationStrategy extends apiLogistic.AjOfEstrategiaCotizacion {
  IdAjOfEstrategiaCotizacion: string;
  isChanged: false;
}

export interface IQuotationStrategyTactic extends apiCatalogs.CatEstrategiaCotizacionTactica {
  isSelected: boolean;
  listSubTactic: Array<IQuotationStrategySubTactic>;
}

export interface IQuotationStrategySubTactic extends apiCatalogs.CatEstrategiaCotizacionSubtactica {
  isSelected: boolean;
  ajOfQuotationStrategyTactic?: apiLogistic.AjOfEstrategiaCotizacionTactica;
}

//DOCS: INTERFAZ DE LAS TABS
export interface ITabs {
  tabsOptions: Array<ITabOption>;
  tabSelected: ITabOption;
}

export interface IGeneralDataStrategyRead {
  totalQuotations: string;
  route: string;
  whoBills: string;
  billingCurrency: string;
  paymentConditions: string;
  assignedUser: string;
  address: string;
  folio: string;
  contactName: string;
  email: string;
  phone1: string;
  phone2: string;
  mobile: string;
  department: string;
  position: string;
  decisionLevel: string;
  descriptionPosition: string;
  incomeLevel?: string;
  category?: string;
}

export interface IGeneralDataQuotationStrategy {
  clientName: string;
  totalQuotations?: string;
  incomeLevel: string;
  category: string;
  route: string;
  whoBills: string;
  billingCurrency: string;
  paymentConditions: string;
  assignedUser: string;
  address: string;
  folio: string;
  image: string;
  imageHover: string;
}

export interface IGeneralDataContactQuotationStrategy {
  names: string;
  lastName: string | undefined;
  surname: string | undefined;
  email: string;
  phone1: string;
  phone2: string;
  department: string;
  job: string;
  decisionLevel: string;
}

//DOCS: INTERFAZ PARA CREAR LA ESTRUCTURA DE LAS ESTRATEGIAS, TACTICAS Y SUBTACTICAS
export interface IQuotationStrategyResponse extends IQuotationStrategy {
  idClient: string;
  idUser: string;
  idAjOfQuotationStrategy: string;
  listQuotationStrategyTacticOptions: Array<IQuotationStrategyTactic>;
  ajOfQuotationStrategy: IAjOfQuotationStrategy;
  itemSelected: DropListOption;
}

//DOCS: TODOS LOS INICIALIZADORES

//TODO: LAS INTERFACES A CONTINUACIÓN TAMBIÉN LAS OCUPAN CERRAR OFERTA Y PROCESS DETAILS
export interface IBrands {
  listBrands: Array<IBrandWithContract>;
  listBrandsStatus: number;
  needsToReloadBrands: boolean;
}

//DOCS: YA NO LA OCUPA STRATEGY DETAILS, SOLO CERRAR OFERTA Y PROMESA DE COMPRA
export interface IGeneralDataStrategy {
  billingData?: apiCatalogs.VDatosFacturacionCliente;
  currency?: apiCatalogs.CatMoneda;
  paymentConditions?: apiCatalogs.CatCondicionesDePago;
  user?: apiCatalogs.Usuario;
  address?: apiCatalogs.VDireccion;
}

export const initialQuotationStrategyResponse = (): IQuotationStrategyResponse => ({
  listQuotationStrategy: [],
  listQuotationStrategyTactic: [],
  listQuotationStrategySubTactic: [],
  listQuotationStrategyTacticOptions: [],
  idClient: '',
  idUser: '',
  idAjOfQuotationStrategy: '',
  ajOfQuotationStrategy: initialListAjOfQuotationStrategy(),
  itemSelected: {} as DropListOption,
});

//DOCS:  OCUPA STRATEGY DETAILS y CERRAR OFERTA
export const initialBrands = (): IBrands => ({
  listBrands: [],
  listBrandsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadBrands: true,
});

export const initialListAjOfQuotationStrategy = (): IAjOfQuotationStrategy => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdAjOfEstrategiaCotizacion: DEFAULT_UUID,
  IdCatEstrategiaCotizacion: DEFAULT_UUID,
  IdCliente: DEFAULT_UUID,
  IdUsuarioAprobacion: DEFAULT_UUID,
  IdUsuarioCreacion: DEFAULT_UUID,
  Publicada: false,
  isChanged: false,
});

//DOCS:  OCUPA STRATEGY DETAILS y CERRAR OFERTA
export const initialQuotationStrategy = (): IQuotationStrategyData => ({
  listQuotationStrategy: [],
  listQuotationStrategyTactic: [],
  listQuotationStrategyTacticBackup: [],
  itemSelected: {} as DropListOption,
  quotationStrategyStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadQuotationStrategy: true,
  ajOfQuotationStrategy: initialListAjOfQuotationStrategy(),
  ajOfQuotationStrategyBackup: initialListAjOfQuotationStrategy(),
  responseSaveStrategy: {} as GMEstrategia,
});

//DOCS:  OCUPA STRATEGY DETAILS y CERRAR OFERTA
export interface IQuotationStrategyData {
  listQuotationStrategy: Array<apiCatalogs.CatEstrategiaCotizacion>;
  listQuotationStrategyTactic: Array<IQuotationStrategyTactic>;
  listQuotationStrategyTacticBackup: Array<IQuotationStrategyTactic>;
  itemSelected: DropListOption;
  quotationStrategyStatus: number;
  needsToReloadQuotationStrategy: boolean;
  ajOfQuotationStrategy: IAjOfQuotationStrategy;
  ajOfQuotationStrategyBackup: IAjOfQuotationStrategy;

  responseSaveStrategy: GMEstrategia;
}

//DOCS: LA OCUPA PROCESS-DETAILS.MODEL.TS

export interface IQuotes {
  listQuotes: Array<IQuotation>;
  listQuotesStatus: number;
  needsToReloadQuotation: boolean;
}

export enum StateEmailQuote {
  Confimrmada = 'Confirmada',
  Pendiente = 'Pendiente',
  ErrorEnEnvio = 'ErrorEnEnvio',
}

//DOCS: LA OCUPA PROCESS-DETAILS.MODEL.TS
export const initialQuotes = (): IQuotes => ({
  listQuotes: [],
  listQuotesStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadQuotation: true,
});

//DOCS: LA OCUPA PROCESS-DETAILS.MODEL.TS
export const initialGeneralDataStrategyRead = (): IGeneralDataStrategyRead => ({
  totalQuotations: 'ND',
  route: 'ND',
  whoBills: 'ND',
  billingCurrency: 'ND',
  paymentConditions: 'ND',
  assignedUser: 'ND',
  address: 'ND',
  folio: 'ND',
  contactName: 'ND',
  email: 'ND',
  phone1: 'ND',
  phone2: 'ND',
  mobile: 'ND',
  department: 'ND',
  position: 'ND',
  decisionLevel: 'ND',
  descriptionPosition: 'ND',
});
