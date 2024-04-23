import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  CotCotizacion,
  CotPartidaCotizacionDetalle,
  GMCotFletes,
  VClienteCotizacionesPromesaDeCompraCarrusel,
  VPartidaCotizacion,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IImageItem} from '@appModels/shared/shared.models';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface IAddPurchaseOrderItems extends GMCotFletes {
  productsQueryInfo: apiCatalogs.QueryInfo;
  searchTypes: Array<DropListOption>;
  searchTypeSelected: DropListOption;
  apiStatus: number;
  quoteList: Array<IQuoted>;
  quotedSelected: IQuoted;
  itemList: Array<IQuoteItem>;
  itemListBackUp: Array<IQuoteItem>;
  runSearchTerm: string;
  searchTerm: string;
  optionsOfProducts: Array<apiCatalogs.SugerenciaBusqueda>;
  optionsOfProductsStatus: number;
  optionOfProductSelected: DropListOption;
  // isSearch: boolean;
  productToSearch: DropListOption;
}

export const initialIAddPurchaseOrderItems = (): IAddPurchaseOrderItems => ({
  productsQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    SortField: 'Descripcion',
    desiredPage: 1,
    pageSize: PAGING_LIMIT,
  },
  searchTypes: [
    {label: 'Catálogo', value: '1'},
    {label: 'Descripcion', value: '2'},
    {label: 'CAS', value: '3'},
  ],
  searchTypeSelected: {label: 'Catálogo', value: '1'},
  quoteList: [],
  quotedSelected: {} as IQuoted,
  itemList: [],
  itemListBackUp: [],
  runSearchTerm: '',
  searchTerm: null,
  optionsOfProducts: [],
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  optionOfProductSelected: {} as DropListOption,
  // isSearch: false,
  productToSearch: null,
  apiStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface IQuoted extends VClienteCotizacionesPromesaDeCompraCarrusel {
  needsToReloadItems?: boolean;
  items?: Array<IQuoteItem>;
  isSelected?: boolean;
  freightsQuote?: GMCotFletes;
  TotalCotizado?: number;
}

export interface IQuoteItem extends VPartidaCotizacion, IImageItem, CotPartidaCotizacionDetalle {
  Index?: number;
  isSelected?: boolean;
  label?: string;
  IdContratoCliente?: string;
  IdEmpresa?: string;
  isInViewQuotesLinked?: boolean;
  quotesLinked?: Array<CotCotizacion>;
  needsToReloadLinkeds?: boolean;
  freightItem?: IFreightItem;
}
