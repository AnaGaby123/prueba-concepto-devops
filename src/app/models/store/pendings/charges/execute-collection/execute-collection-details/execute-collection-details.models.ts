/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  FacturasPendientesClienteObj,
  FccNotaCredito,
  FccNotaCreditoPartida,
  FccPagoCliente,
  FccPagoFacturaPedido,
  FccProgramacionCobro,
  VFacturaClienteCalendario,
  VFacturaClienteCalendarioTotales,
  VFCCFolioPagoCliente,
} from 'api-finanzas';
import {Archivo, DatosBancarios, VCorreoCliente} from 'api-catalogos';
import {ContactoDetalleObj} from 'api-logistica';
import {IFilterDate} from '@appModels/filters/Filters';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IFile, IUploadFileCustom} from '@appModels/files/files.models';

/* Utils Imports */
import {
  ALL_VALUE,
  API_REQUEST_STATUS_DEFAULT,
  CURRENCY_MXN,
  CURRENCY_USD,
  DEFAULT_DATE,
  DEFAULT_UUID,
  HIGHER_VALUE,
  LOWER_VALUE,
} from '@appUtil/common.protocols';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {
  ICancelInvoice,
  ICreditNote,
  initialICreditNote,
  initialIRebillRadio,
  IRebillRadio,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';

export interface IExecuteCollectionDetails {
  searchTerm: string;
  burgerOptions: Array<DropListOption>;
  burgerOptionSelected: DropListOption;
  searchTypeOptions: Array<DropListOption>;
  mecOptions: Array<DropListOption>;
  paymentMethodsOptions: Array<DropListOption>;
  chargesOptions: Array<DropListOption>;
  currencyOptions: Array<DropListOption>;
  needsToReload: boolean;
  paymentStatus: number;
  itemsStatus: number;
  selectedClient: VFacturaClienteCalendarioTotales;
  paymentList: Array<IExecuteCollectionPayment>;
  selectedPayment: IExecuteCollectionPayment;
  paymentTransaction: IPaymentTransaction;
  barsData?: FacturasPendientesClienteObj;
  bankData: Array<DatosBancarios>;
  totalsTabs?: any;
  selectedTab?: ITabOption;
  itemsList?: Array<IInvoice>;
  creditNotes?: Array<IFccNotaCredito>;
  billsSearchTerm?: string;
  selectedSearchType?: DropListOption;
  selectedMecOption?: DropListOption;
  selectedPaymentMethodsOption?: DropListOption;
  selectedChargesOption?: DropListOption;
  billFilterDate?: IFilterDate;
  chargeFilterDate?: IFilterDate;
  rebill: IRebill;
  isLoadingFile: boolean;
}

export interface IExecuteCollectionPayment extends VFCCFolioPagoCliente {
  Index?: number;
  isSelected?: boolean;
  needsToReloadItems?: boolean;
  clientEmail?: VCorreoCliente;
  filesEmail?: Archivo;
  clientContact?: ContactoDetalleObj;
  openViewFile?: boolean;
  fileBase64?: string;
}

export interface IPaymentTransaction {
  fccPagoCliente: IFccPagoCliente;
  fccFolioPagoCliente: IExecuteCollectionPayment;
  fccPagoFacturaPedido?: Array<FccPagoFacturaPedido>;
  fccNotaCreditoPedido?: Array<FccNotaCreditoPartida>;
  files?: Array<IUploadFileCustom>;
  itemsList?: Array<IInvoice>;
  selectedCurrency?: DropListOption;
  selectedPaymentMethod?: DropListOption;
  selectedBankAccount?: DropListOption;
  selectedBankName?: DropListOption;
  selectedBrokerName?: DropListOption;
}

export interface IInvoice extends VFacturaClienteCalendario {
  Index: number;
  selected: boolean;
  openInput?: boolean;
  NumeroDeParcialidad?: number;
  MontoUSD?: number;
  MontoMXN?: number;
  isUSD?: boolean;
  isMXN?: boolean;
  comments?: string;
  hasTemporaryDate?: boolean;
  FechaCompromisoPagoDate?: Date;
  fccProgramacionCobro?: FccProgramacionCobro;
}

export interface IFccNotaCredito extends FccNotaCredito {
  Index: number;
  isSelected: boolean;
}

export interface IFccPagoCliente extends FccPagoCliente {
  FechaPagoDate: Date;
  MontoMXN?: number;
  MontoUSD?: number;
}

export interface ICreditNotesTotals {
  Length: number;
  TotalUSD: number;
  TotalMXN: number;
}

export interface IPaymentTransactionTotals {
  CreditNotes: number;
  Payment: number;
  Unpaid: number;
  Total: number;
}

export interface IPaymentTransactionConversion {
  totalAmountUSD: number;
  totalAmountMXN: number;
}

export const initialIExecuteCollectionDetails = (): IExecuteCollectionDetails => ({
  searchTerm: '',
  burgerOptions: [
    {
      value: '1',
      label: 'Más Nuevos',
    },
    {
      value: '2',
      label: 'Más Antiguos',
    },
  ],
  burgerOptionSelected: {
    value: '1',
    label: 'Más Nuevos',
  },
  searchTypeOptions: [
    {value: '1', label: '# Factura'},
    {value: '2', label: '# P. Interno'},
  ],
  mecOptions: initialMecOptions(),
  paymentMethodsOptions: [
    {
      value: '1',
      label: 'Transferencia',
    },
    {
      value: '2',
      label: 'Pago en una sola..',
    },
  ],
  chargesOptions: initialDebtOption(),
  currencyOptions: [
    {
      value: '1',
      label: CURRENCY_USD,
    },
    {
      value: '2',
      label: CURRENCY_MXN,
    },
  ],
  needsToReload: true,
  paymentStatus: API_REQUEST_STATUS_DEFAULT,
  itemsStatus: API_REQUEST_STATUS_DEFAULT,
  selectedClient: {} as VFacturaClienteCalendarioTotales,
  paymentList: [],
  selectedPayment: {} as IExecuteCollectionPayment,
  paymentTransaction: {
    fccPagoCliente: {
      Activo: true,
      Broker: false,
      CuentaOrdenante: '',
      FechaPago: DEFAULT_DATE,
      FechaPagoDate: null,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_DATE,
      Folio: '',
      IdArchivo: null,
      IdCFDI: null,
      IdCatBanco: null,
      IdCatBrokerCliente: null,
      IdCatMedioDePago: null,
      IdCliente: null,
      IdContactoCliente: null,
      IdDatosBancarios: null,
      IdEmpresa: null,
      IdFCCFolioPagoCliente: null,
      IdFCCPagoCliente: DEFAULT_UUID,
      InformacionComplementoPago: false,
      MXN: false,
      Monto: 0,
      ReferenciaBancaria: '',
      Serie: 'A',
      TipoDeCambio: 0,
      USD: false,
    },
    fccFolioPagoCliente: {
      IdFCCFolioPagoCliente: DEFAULT_UUID,
      IdArchivo: null,
      IdCorreoRecibidoCliente: DEFAULT_UUID,
      Folio: '',
      Consecutivo: 0,
      FechaRecepcion: DEFAULT_DATE,
      Stp: true,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_DATE,
      Activo: true,
    },
    files: [],
    selectedCurrency: {} as DropListOption,
    selectedPaymentMethod: {} as DropListOption,
    selectedBankAccount: {} as DropListOption,
    selectedBrokerName: {} as DropListOption,
  },
  bankData: [],
  selectedSearchType: {value: '1', label: '# Factura'},
  billFilterDate: {} as IFilterDate,
  chargeFilterDate: {} as IFilterDate,
  rebill: initialIRebill(),
  isLoadingFile: false,
});
export const initialMecOptions = (): Array<DropListOption> => [
  {
    value: '1',
    label: HIGHER_VALUE,
  },
  {
    value: '2',
    label: LOWER_VALUE,
  },
];
export const initialDebtOption = (): Array<DropListOption> => [
  {
    value: '1',
    label: ALL_VALUE,
  },
  {
    value: '2',
    label: 'A Tiempo (-8 a 0 Días)',
    circleColor: '#4ba92b',
  },
  {
    value: '3',
    label: 'Vencido (+1 a +8 Días)',
    circleColor: '#f5b750',
  },
  {
    value: '4',
    label: 'Vencido (+9 a +16 Días)',
    circleColor: '#ec6d44',
  },
  {
    value: '5',
    label: 'Vencido (+17 a  +179 Días )',
    circleColor: '#d81414',
  },
  {
    value: '6',
    label: 'Moroso (+180 Días en adelante)',
    circleColor: '#6a6aae',
  },
];
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

export interface IRebill {
  radioButtons: Array<IRadioButton>;
  reasonOptions: Array<DropListOption>;
  cancelInvoice: ICancelInvoice;
  rebillRadio: IRebillRadio;
  creditNote: ICreditNote;
  invoiceFile: IFile;
}
