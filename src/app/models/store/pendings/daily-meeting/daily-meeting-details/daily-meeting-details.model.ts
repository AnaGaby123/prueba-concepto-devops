import * as apiCatalogs from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  GMCotFletes,
  PartidaCotizacionTasaConversionBaseObj,
  QueryInfo,
  TupleDecimalDecimalInt32,
} from 'api-logistica';
import {
  IClientQuotation,
  IDashboardClients,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {IImageItem} from '@appModels/shared/shared.models';
import {IOfferState} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.model';
import {IFreightItem} from '@appModels/table/internal-sales-item';

//DOCS: INTERFAZ DEL ESTADO INICIAL DE DETALLES
export interface DailyMeetingDetailsState {
  eviSelected: Evi;
  listClients: Array<IClientQuotation>;
  freightSelectedQuote: GMCotFletes;
  listClientsStatus: number;
  clientSelected: IClientQuotation;
  quotationSelected: IQuotation;
  clientQuotes: Array<IQuotation>;
  itemsQuotationSelected: IQueryResultIItemQuotation;
  itemsQuotationStatus: number;
  queryInfoItemsQuotation: QueryInfo;
  listQuotesStatus: number;
  barPercentages?: IEntriesPercentages;
  clientQuotationStrategy: IClientQuotationStrategyData;
  dashboardClients: IDashboardClients;
  offerSection: IOfferState;
  tabs: ITabs;
}

//DOCS: INTERFACES EN LA SELECCIÓN DE TACTICAS Y SUBTACTICAS PUBLICACIÓN DE ESTRATEGIA
export interface ITactic {
  value: boolean;
  tactic: IQuotationStrategyTactic;
}

export interface ISubTactic {
  value: boolean;
  subTactic: IQuotationStrategySubTactic;
  isMultiSubTactic: boolean;
}

//DOCS: INTERFAZ PARA LA BARRA DE PORCENTAJE
export interface IEntriesPercentages {
  Original?: TupleDecimalDecimalInt32;
  Ahorro?: TupleDecimalDecimalInt32;
  Complementaria?: TupleDecimalDecimalInt32;
  Promocion?: TupleDecimalDecimalInt32;
  Alternativa?: TupleDecimalDecimalInt32;
}

//DOCS: INTERFAZ PARA LA PAGINACIÓN DE LAS PARTIDAS
export interface IQueryResultIItemQuotation {
  Results?: Array<IItemQuotation>;
  TotalResults?: number;
}

//DOCS: INTERFACES PARA PINTAR LOS DATOS GENERALES EN VISTA DETALLE
export interface IGeneralData extends IClientData {
  NombreUsuario: string;
}

export interface IClientData {
  IdCliente: string;
  IdAjOfEstrategiaCotizacion: string;
  NombreCliente: string;
  ObjetivoCrecimientoFundamental: number;
  ObjetivoFundamentalUSD: number;
  Estrategia: string;
  TotalCotizadoUSD: number;
  TotalFacturadoMXN: number;
  TotalFacturadoUSD: number;
  TotalCotizado: number;
  Index: number | string;
  HorasCaducidadMasReciente: number;
}

//DOCS: INTERFAZ PARA LAS COTIZACIÓNES DEL EVI SELECCIONADO
export interface IQuotation extends apiLogistic.VCotCotizacion {
  isSelected: boolean;
  index: number;
  needsToReloadItemQuotation: boolean;
  brands?: Array<DropListOption>;
  brand?: DropListOption;
  currency: string;
  itemsQuotation?;
  itemsQuotationStatus?: number;
}

//DOCS: INTERFAZ PARA LAS PARTIDAS DE LA COTIZACIÓN SELECCIONADA
export interface IItemQuotation extends apiLogistic.PartidaCotizacionTasaConversionObj, IImageItem {
  Index?: number;
  popUpByType?: IPopUpData;
  popUpByBrand?: IPopUpData;
  PartidasHijas?: Array<IItemQuotationWithChild>;
  PorcentajeTasasConversionMarca?: number;
  PorcentajeTasasConversionTipo?: number;
  freightItem?: IFreightItem;
  // children: Array<IItemQuotation>;
  // isChild: boolean;
  // conversionFeesPercentageByType: number;
  // conversionFeesPercentageByBrand: number;
  // totalByType: number;
  // totalByBrand: number;
  // doughnutChartDataConversionByType: IDoughnutChart;
  // doughnutChartDataConversionByBrand: IDoughnutChart;
  // doughnutChartOptionConversionDetailsByType: Array<IDoughnutChartDetails>;
  // doughnutChartOptionConversionDetailsByBrand: Array<IDoughnutChartDetails>;
  // detailsByType: Array<IDetails>;
  // detailsByBrand: Array<IDetails>;
}

export interface IDetails {
  Partidas: number;
  Porcentaje: number;
  Descripcion: string;
}

//DOCS: INTERFAZ PARA LAS PARTIDAS HIJAS
export interface IItemQuotationWithChild extends PartidaCotizacionTasaConversionBaseObj {
  IItemQuotation?;
  PorcentajeTasasConversionMarca?: number;
  PorcentajeTasasConversionTipo?: number;
  popUpByType?: IPopUpData;
  popUpByBrand?: IPopUpData;
  imageHover?: string;
}

//DOCS: INTERFACES PARA GESTIONAR LA PUBLICACIÓN DE LA ESTRATEGIA
export interface IClientQuotationStrategyData {
  listQuotationStrategy: Array<apiCatalogs.CatEstrategiaCotizacion>;
  listQuotationStrategyTactic: Array<IQuotationStrategyTactic>;
  listQuotationStrategyTacticBackup: Array<IQuotationStrategyTactic>;
  itemSelected: DropListOption;
  quotationStrategyStatus: number;
  needsToReloadQuotationStrategy: boolean;
  ajOfQuotationStrategy: IAjOfQuotationStrategy;
  ajOfQuotationStrategyBackup: IAjOfQuotationStrategy;
}

export interface IQuotationStrategyTactic extends apiCatalogs.CatEstrategiaCotizacionTactica {
  isSelected: boolean;
  listSubTactic: Array<IQuotationStrategySubTactic>;

  // changedJustification : boolean;
  // change
}

export interface IAjOfQuotationStrategy extends apiLogistic.AjOfEstrategiaCotizacion {
  IdAjOfEstrategiaCotizacion: string;
  isChanged: false;
}

//DOCS: INTERFACES PARA CONSTRUIR EL CUERPO DE LA PETICIÓN QUE TRAE LA ESTRATEGIA ESTABLECIDA
export interface ICatStrategies {
  listQuotationStrategy: Array<apiCatalogs.CatEstrategiaCotizacion>;
  listQuotationStrategyTactic: Array<apiCatalogs.CatEstrategiaCotizacionTactica>;
  listQuotationStrategySubTactic: Array<apiCatalogs.CatEstrategiaCotizacionSubtactica>;
  needsToReloadCatStrategies: boolean;
}

export interface IQuotationStrategyResponse {
  idClient: string;
  idUser: string;
  idAjOfQuotationStrategy: string;
  listQuotationStrategyTacticOptions: Array<IQuotationStrategyTactic>;
  ajOfQuotationStrategy: IAjOfQuotationStrategy;
  itemSelected: DropListOption;
  catStrategies: ICatStrategies;
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

//DOCS: INTERFAZ PARA LAS TABS DE OFERTA, RELACIÓN, CONTACTO, SMART BUSINESS
export interface ITabs {
  tabsOptions: Array<ITabOption>;
  tabSelected: ITabOption;
}

//DOCS: INTERFAZ PARA LOS POPS
export interface IPopUpData {
  isOpen: boolean;
  isInRange: boolean;
  elementId: string;
  target: HTMLElement;
  position: string;
  zIndex: number;
}
