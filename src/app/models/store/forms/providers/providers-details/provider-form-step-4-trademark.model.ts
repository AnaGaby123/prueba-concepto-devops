import {
  MarcaFamiliaProveedor,
  QueryInfo,
  VMarca,
  VMarcaDetalle,
  VMarcaFamiliaDetalle,
  VProveedor,
} from 'api-catalogos';
import {initialTradeMarkQueryInfo} from '@appModels/store/forms/providers/providers-list/providers-query-info';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {IImageItem} from '@appModels/shared/shared.models';

export interface Trademark {
  associatedList: Array<IVTrademarkDetail>;
  associatedTradeMarkStatus: number;
  backUpAssociated: BackUp;
  catCountry: DropListOptionCustom[];
  disableAssociated: Array<IVTrademarkDetail>;
  enableEdit: boolean;
  filter: ITabOption;
  firstLoading: boolean;
  firstLoadingAssociated: boolean;
  isOpenTrademarkPop: boolean;
  property: string;
  provider: VProveedor;
  queryInfo: QueryInfo;
  termSearch: string;
  tradeMarkList: IQueryResultIVMarca;
  tradeMarkStatus: number;
}

export interface IQueryResultIVMarca {
  Results?: Array<IVMarca>;
  TotalResults?: number;
}

export interface IVMarca extends VMarca, IImageItem {}

export const initialTrademark = (): Trademark => ({
  provider: null,
  property: 'example',
  tradeMarkList: {Results: [], TotalResults: 0},
  queryInfo: initialTradeMarkQueryInfo(),
  tradeMarkStatus: API_REQUEST_STATUS_DEFAULT,
  associatedTradeMarkStatus: API_REQUEST_STATUS_DEFAULT,
  associatedList: [],
  filter: initialFilter(),
  termSearch: '',
  catCountry: [],
  enableEdit: false,
  backUpAssociated: initialBackUp(),
  disableAssociated: [],
  firstLoading: true,
  firstLoadingAssociated: true,
  isOpenTrademarkPop: false,
});

export const initialFilter = (): ITabOption => ({
  id: '1',
  label: 'HABILITADOS',
  activeSubtitle: false,
});

export const initialFormTradeMark = (): VMarca => ({
  Nombre: null,
  IdMarca: null,
  Direccion: '',
  IdArchivo: null,
  TaxId: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  TotalProductos: 0,
  IdCatPaisCompra: null,
  IdCatPaisManufactura: null,
  Activo: true,
});

export interface BackUp {
  associatedList: IVTrademarkDetail[];
  deleteTradeMark: IVTrademarkDetail[];
}

export const initialBackUp = (): BackUp => ({
  associatedList: [],
  deleteTradeMark: [],
});

export interface ITrademarkFamilyChange {
  value: boolean;
  family?: IVTrademarkFamilyDetail;
}

export interface IVTrademarkDetail extends VMarcaDetalle {
  vMarcaFamiliaDetalle?: Array<IVTrademarkFamilyDetail>;
}

export interface IVTrademarkFamilyDetail extends VMarcaFamiliaDetalle {
  IdProveedorBackup?: string;
  MarcaFamiliaProveedor: IMarcaFamiliaProveedor;
}

export interface IMarcaFamiliaProveedor extends MarcaFamiliaProveedor {
  original?: boolean;
}
