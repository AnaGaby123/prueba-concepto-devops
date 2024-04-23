import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import * as apiCatalogs from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IPpPartidaPedidoDetalle} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';

export interface IReplacePurchaseOrderItem {
  productsQueryInfo: apiCatalogs.QueryInfo;
  runSearchTerm: string;
  searchTerm: string;
  searchTypeSelected: DropListOption;
  listOfItem: Array<IQuoteItem>;
  productToSearch: DropListOption;
  quotedSelected: IQuoted;
  quoteList: Array<IQuoted>;
  optionsOfProducts: Array<apiCatalogs.SugerenciaBusqueda>;
  optionsOfProductsStatus: number;
  optionOfProductSelected: DropListOption;
}

export const initialIReplacePurchaseOrderItem = (): IReplacePurchaseOrderItem => ({
  productsQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    SortField: 'Descripcion',
    desiredPage: 1,
    pageSize: PAGING_LIMIT,
  },
  runSearchTerm: '',
  searchTerm: null,
  searchTypeSelected: {label: 'Descripción', value: '3'},
  listOfItem: [],
  productToSearch: null,
  quotedSelected: {} as IQuoted,
  quoteList: [],
  optionsOfProducts: [],
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  optionOfProductSelected: {} as DropListOption,
});

export interface IDataItemToReplace {
  itemToReplace: IPpPartidaPedidoDetalle;
  itemFromReplace: IQuoteItem;
  IdPPPartidaPedidoConfiguracion: string;
  IdPPPartidaPedido?: string;
}
