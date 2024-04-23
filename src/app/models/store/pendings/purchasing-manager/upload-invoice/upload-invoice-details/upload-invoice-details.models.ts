import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {
  CalcularMontosImportacion,
  VOcOrdenDeCompra,
  VPartidaComprasCargarFactura,
} from 'api-logistica';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {ArchivoDetalle, ContactoDetalleProvObj, UrlSubirArchivo} from 'api-catalogos';

export interface IUploadInvoiceDetails {
  purchaseOrder: IPurchaseOrdersOc;
  providerSelected: IProviderUpload;
  sortOptions: DropListOption[];
  sortSelected: DropListOption;
  queryInfo: IQueryInfoOptions;
  orderSelected: IPurchaseOrderOc;
  itemsInvoice: Array<IPurchaseItemUploadInvoice>;
  invalidateSelected: boolean;
  dataInvoice: IInvoice;
  importAmount: CalcularMontosImportacion;
  isNational: boolean;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export const initialIUploadInvoiceDetails = (): IUploadInvoiceDetails => ({
  purchaseOrder: {TotalResults: 0, Results: []},
  providerSelected: {} as IProviderUpload,
  sortOptions: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  sortSelected: {value: '1', label: HIGHER_VALUE},
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
    reloadStates: false,
  },
  orderSelected: {} as IPurchaseOrderOc,
  itemsInvoice: [],
  invalidateSelected: false,
  dataInvoice: initialDataInvoice(),
  importAmount: initialImportAmount(),
  isNational: false,
  providerContacts: [],
  selectedProviderContact: null,
});

export interface IPurchaseOrdersOc {
  TotalResults: number;
  Results: Array<IPurchaseOrderOc>;
}

export interface IPurchaseOrderOc extends VOcOrdenDeCompra {
  Index: number;
  items: Array<IPurchaseItemUploadInvoice>;
  needsToReloadItems: boolean;
}

export interface IPurchaseItemUploadInvoice extends VPartidaComprasCargarFactura {
  Index: number;
}

export interface IInvoice {
  amount: number;
  invoiceNum: string;
  invoiceDate: string;
  invoiceDateDate: Date;
  receptionDate: string;
  receptionDateDate: Date;
  filePDF: File;
  fileXML: File;
  comment: string;
  showInputsFiles: boolean;
}

export interface IFileUpload {
  order?: IPurchaseOrderOc;
  file: File;
  fileDetail?: ArchivoDetalle;
  url?: UrlSubirArchivo;
}

export interface ITotItems {
  cant: number;
  amount: number;
  import: number;
}

export const initialITotItems = (): ITotItems => ({
  cant: 0,
  amount: 0,
  import: 0,
});
export const initialDataInvoice = (): IInvoice => ({
  amount: null,
  invoiceNum: null,
  invoiceDate: null,
  invoiceDateDate: null,
  receptionDate: null,
  receptionDateDate: null,
  filePDF: null,
  fileXML: null,
  comment: null,
  showInputsFiles: true,
});
export const initialImportAmount = (): CalcularMontosImportacion => ({
  DTA: 0,
  IGI: 0,
  IVA: 0,
  MontoFlete: 0,
  Subtotal: 0,
  Total: 0,
  ValorComercial: 0,
});
