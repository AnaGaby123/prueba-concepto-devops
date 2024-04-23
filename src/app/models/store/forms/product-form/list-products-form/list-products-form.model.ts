import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_UUID} from '@appUtil/common.protocols';
import {QueryInfo, SugerenciaBusqueda, VProducto} from 'api-catalogos';
import {initialProductsInfo} from '@appModels/store/forms/product-form/list-products-form/products-query-info';
import {IImageItem} from '@appModels/shared/shared.models';

export interface ListProductsForm {
  productsStatus: number;
  optionTypesSearch: Array<DropListOption>;
  selectedTypeOfSearch: DropListOption;
  runSearchTerm: string;
  searchTerm: string;
  optionsOfProducts: Array<SugerenciaBusqueda>;
  optionOfProductSelected: DropListOption;
  optionsOfProductsStatus: number;
  listProduct: IQueryResultVProduct;
  TrademarkSelected: DropListOption;
  listProductsType: Array<DropListOption>;
  ProductTypeSelected: DropListOption;
  LineSelected: DropListOption;
  PriceSelected: DropListOption;
  catPrice: Array<DropListOption>;
  ProductStateSelected: DropListOption;
  queryInfo: QueryInfo;
  typeList: boolean;
}

export const initialListProduct = (): ListProductsForm => ({
  productsStatus: API_REQUEST_STATUS_DEFAULT,
  runSearchTerm: '',
  searchTerm: '',
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  optionOfProductSelected: {} as DropListOption,
  optionsOfProducts: [],
  optionTypesSearch: [
    {value: '1', label: 'Catálogo'},
    {value: '2', label: 'Concepto'},
    {value: '3', label: 'Marca'},
    {value: '4', label: 'CAS'},
  ],
  selectedTypeOfSearch: {value: '1', label: 'Catálogo'},
  listProduct: {Results: [], TotalResults: 0},
  listProductsType: [
    {label: 'Todos los Productos', value: DEFAULT_UUID},
    {label: 'Controlado', value: 'true'},
    {label: 'No Controlado', value: 'false'},
  ],
  catPrice: [
    {label: 'Mayor Precio', value: 'desc'},
    {label: 'Menor Precio', value: 'asc'},
  ],
  TrademarkSelected: {value: DEFAULT_UUID, label: 'Todas las Marcas'},
  ProductTypeSelected: {value: DEFAULT_UUID, label: 'Todos los Tipos'},
  LineSelected: {value: DEFAULT_UUID, label: 'Todas las Líneas'},
  ProductStateSelected: {
    value: DEFAULT_UUID,
    label: 'Todos los Productos ',
    labelColors: ['#4ba92b', '#a45aeb', '#e29d2a', '#c2c3c9'],
  },
  PriceSelected: {label: 'Menor Precio', value: 'asc'},
  queryInfo: initialProductsInfo(),
  typeList: false,
});

export interface IQueryResultVProduct {
  Results?: Array<IProduct>;
  TotalResults?: number;
}

export interface IProduct extends VProducto, IImageItem {
  Index: number;
  ImagePresentation?: string;
  ImagePresentationHover?: string;
}
