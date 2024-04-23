import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {FccRevisionProgramadaDetalle, VTpProformaPedidoDetalle} from 'api-finanzas';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {ContactoDetalleObj, DatosFacturacionClienteDetalle} from 'api-logistica';
import {DireccionClienteDetalle} from 'api-catalogos';
import {IFile, IUploadFileCustom} from '@appModels/files/files.models';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';

export interface IAttendReviewDetails {
  selectedClient: ICustomerAttend;
  searchTerm: string;
  filters: Array<DropListOption>;
  selectedFilter: DropListOption;
  bills: Array<IBills>;
  selectedBill?: IBills;
  queryInfo: IQueryInfoOptions;
  address: DireccionClienteDetalle;
  billsOfClient: DatosFacturacionClienteDetalle;
  priority: DropListOption;
  reviewDate: string;
  additionalComment: string;
  rebill: IRebill;
}

export const initialIAttendReviewDetails = (): IAttendReviewDetails => ({
  selectedClient: null,
  searchTerm: '',
  filters: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  selectedFilter: {value: '1', label: 'Más Nuevas'},
  bills: [],
  selectedBill: {} as IBills,
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  address: {} as DireccionClienteDetalle,
  billsOfClient: {} as DatosFacturacionClienteDetalle,
  priority: {} as DropListOption,
  reviewDate: null,
  additionalComment: null,
  rebill: initialIRebill(),
});
export const initialIRebill = (): IRebill => ({
  radioButtons: [
    {value: true, label: 'cancelInvoice'},
    {value: false, label: 'rebill'},
    {value: false, label: 'creditNote'},
  ],
  reasonOptions: [
    {value: '1', label: 'No se'},
    {value: '2', label: 'No tengo idea'},
    {value: '3', label: 'No me interesa'},
  ],
  cancelInvoice: {reason: null},
  rebillRadio: initialIRebillRadio(),
  creditNote: initialICreditNote(),
  invoiceFile: {},
});

export interface IBills extends VTpProformaPedidoDetalle {
  index: number;
  contact: ContactoDetalleObj;
  dataReview: IProgrammingReview;
  needToReload: boolean;
  files: Array<IUploadFileCustom>;
  url: string;
  requestStatusFile?: number;
}

export interface IAddressClient {
  country: DropListOption;
  state: DropListOption;
  route: DropListOption;
  zone: DropListOption;
}

export interface IProgrammingReview extends FccRevisionProgramadaDetalle {
  dateFormat: Date;
}

export interface IRebill {
  radioButtons: Array<IRadioButton>;
  reasonOptions: Array<DropListOption>;
  cancelInvoice: ICancelInvoice;
  rebillRadio: IRebillRadio;
  creditNote: ICreditNote;
  invoiceFile: IFile;
}

export interface ICancelInvoice {
  reason: DropListOption;
}

export interface IRebillRadio {
  checkBox: boolean;
  reason: DropListOption;
}

export interface ICreditNote {
  dropItems: Array<DropListOption>;
  dropItemSelected: DropListOption;
  isInItemsView: boolean;
}

export const initialIRebillRadio = (): IRebillRadio => ({
  checkBox: false,
  reason: null,
});
export const initialICreditNote = (): ICreditNote => ({
  dropItems: [
    {value: '1', label: 'Prueba1'},
    {value: '2', label: 'Prueba2'},
  ],
  dropItemSelected: null,
  isInItemsView: false,
});
