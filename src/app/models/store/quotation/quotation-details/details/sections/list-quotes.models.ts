import * as apiCatalogs from 'api-catalogos';
import {ProductoCapacitacion, VProducto, VProductoDetalle} from 'api-catalogos';
import {
  CotCotizacion,
  CotPartidaCotizacionInvestigacion,
  CotPartidaInvestigacionProducto,
  VConfiguracionAplicadaClienteEstante,
  VPartidaCotizacion,
} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ISingleQuotationDetails} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_UUID, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IImageItem} from '@appModels/shared/shared.models';

export interface ListQuotesState {
  productsQueryInfo: apiCatalogs.QueryInfo;
  listProducts: Array<IProduct>;
  listProductsStatus: number;
  total: number;
  itemBrand: DropListOption;
  itemLines: DropListOption;
  itemProductType: DropListOption;
  options: Array<ITabOption>;
  optionSelected: ITabOption;
  runSearchTerm: string;
  searchTerm: string;
  optionsOfProducts: Array<apiCatalogs.SugerenciaBusqueda>;
  optionsOfProductsStatus: number;
  optionOfProductSelected: DropListOption;
  linkedQuotes: IRelate;
  base64File: string;
  modalIsOpenResendQuotation: boolean;
  optionTypeSearch: Array<DropListOption>;
  typeSearchSelected: DropListOption;
  viewFileIsLoading: boolean;
}

export const initialListQuotesState = (): ListQuotesState => ({
  productsQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    SortField: 'Descripcion',
    desiredPage: 1,
    pageSize: PAGING_LIMIT,
  },
  listProducts: [],
  listProductsStatus: API_REQUEST_STATUS_DEFAULT,
  total: 0,
  itemBrand: {value: DEFAULT_UUID, label: 'Todas las Marcas'},
  itemLines: {value: DEFAULT_UUID, label: 'Todas las Lineas'},
  itemProductType: {value: DEFAULT_UUID, label: 'Todos los Tipos'},
  options: [
    {id: '1', label: 'FICHA TÉCNICA'},
    {id: '2', label: 'ALTERNATIVOS'},
    {id: '3', label: 'COMPLEMENTARIOS'},
  ],
  optionSelected: {id: '1', label: 'FICHA TÉCNICA'},
  runSearchTerm: '',
  searchTerm: '',
  optionsOfProducts: [],
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  optionOfProductSelected: {} as DropListOption,
  linkedQuotes: {
    folio: '',
    idArchivo: '',
    idCotCotizacion: '',
    needsToReload: true,
    title: '',
  },
  base64File: null,
  modalIsOpenResendQuotation: false,
  optionTypeSearch: [
    {value: '1', label: 'Concepto'},
    {value: '2', label: 'Marca'},
    {value: '3', label: 'Catálogo'},
    {value: '4', label: 'CAS'},
  ],
  typeSearchSelected: {value: '1', label: 'Concepto'},
  viewFileIsLoading: true,
});

export interface ProductSearchResult
  extends VProducto,
    VConfiguracionAplicadaClienteEstante,
    IImageItem,
    VPartidaCotizacion,
    CotPartidaInvestigacionProducto {
  Index?: number;
  isSelected?: boolean;
  isInViewQuotesLinked?: boolean;
  /*  DOCS: Revisar qué se hará con los atributos de cotizaciones vinculadas*/
  /*  CotizacionesVinculadas?: Array<VCotCotizacion>;*/
  /*  TotalCotizacionesVinculadas?: number;*/
  PrecioDeVenta?: number;
  PiezasACotizar?: number;
  needsToReload?: boolean;
  fullFamilyName?: string;
  vProductDetails?: IVProductoDetalle;
  imageBrand?: string;
  Configurado?: boolean;
}

export interface IProduct extends apiCatalogs.VProducto, VPartidaCotizacion, IImageItem {
  MonedaVentaProveedor?: string;
  TotalAlternativo?: number;
  TotalComplementario?: number;
  TotalSuplementario?: number;
  Controlado?: boolean;
  Control?: string;
  FechaCaducidadLote?: string;
  IdCotPartidaCotizacion?: string;
  IdValorConfiguracionTiempoEntrega?: string;
  NombreLote?: string;
  Nota?: string;
  PrecioTotalCotizado?: number;
  PrecioTotalMXN?: number;
  PrecioTotalUSD?: number;
  TiempoEntrega?: string;
  TipoPartidaCotizacion?: string;
  Total?: number;
  UnidadTiempo?: string;
  Index?: number;
  isSelected?: boolean;
  priceUnit: number;
  listRelated: Array<IRelate>;
  openRelated: boolean;
  needsToReloadLinkeds: boolean;
  isInViewQuotesLinked: boolean;
  quotesLinked: Array<CotCotizacion>;
  dateRealization: DateRealization;
  IdCatDisponibilidad: string;
  Disponibilidad: string;
  IdCatRestriccionDeCompra: string;
  IdCatClasificacionInformativaProducto: string;
  Descripcion: string;
  vProductoSuplementarios?: Array<VProducto>;
  ProductoCapacitacion: ProductoCapacitacion;
}

export interface DateRealization {
  FechaDeRealizacion1: Date;
  FechaDeRealizacion2: Date;
  FechaDeRealizacion3: Date;
  FechaDeRealizacion4: Date;
  FechaDeRealizacion5: Date;
}

export interface IAdddProductQTY {
  IdCotPartidaCotizacion: string;
  IdProducto: string;
  IdCotProductoOferta: string;
  NumeroDePiezas: number;
  itemNumber: number;
  items: Array<number>;
}

export interface IItemQuotationWithProduct extends VPartidaCotizacion, IImageItem {
  needsToReloadProduct: boolean;
  product: apiCatalogs.VProducto;
  priceUnit: number;
  Index: number;
  activeInputPieces: boolean;
  activeInputControlled: boolean;
}

export interface IItemQuotationResearch extends CotPartidaCotizacionInvestigacion, IImageItem {
  NombreMarca: string;
  Index: number;
}

export interface IRelate {
  folio: string;
  idArchivo: string;
  idCotCotizacion: string;
  needsToReload?: boolean;
  title?: string;
}

export interface ISendQuotation {
  activeChangeQuotationState: boolean;
  comments: string;
  quotation: ISingleQuotationDetails;
  file: apiCatalogs.Archivo;
  fileSendEmail: apiCatalogs.ArchivoCorreoEnviado;
  sendEmailData: apiCatalogs.CorreoEnviado;
  type: apiCatalogs.CatTipoPartidaCotizacion;
  isSearchingFile: boolean;
  isFileFound: boolean;
}

export interface IVProductoDetalle extends VProductoDetalle {
  MedioDifucion?: string;
}
