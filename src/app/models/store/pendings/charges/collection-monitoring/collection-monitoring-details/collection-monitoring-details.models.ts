// Models
import {FacturasPendientesClienteObj, VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {ContactoDetalleObj} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  IInvoice,
  initialDebtOption,
  initialMecOptions,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';

// Utils
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface ICollectionMonitoringDetails {
  selectedClient: VFacturaClienteCalendarioTotales;
  tabOptions: Array<ITabOption>;
  selectedTabOption: ITabOption;
  mecOptions: Array<DropListOption>;
  selectedMecOption?: DropListOption;
  paymentMethodsOptions: Array<DropListOption>;
  selectedPaymentMethodsOption?: DropListOption;
  debtOptions: Array<DropListOption>;
  selectedDebtOption?: DropListOption;
  searchTypeOptions: Array<DropListOption>;
  selectedSearchType?: DropListOption;
  searchTerm: string;
  billFilterDate?: IFilterDate;
  chargeFilterDate?: IFilterDate;
  clientContact: ContactoDetalleObj;
  barsData: FacturasPendientesClienteObj;
  invoices: Array<IInvoice>;
  itemsStatus: number;
}

export const initialICollectionMonitoringDetails = (): ICollectionMonitoringDetails => ({
  selectedClient: null,
  tabOptions: tabOptions(),
  selectedTabOption: tabOptions()[0],
  mecOptions: initialMecOptions(),
  selectedMecOption: initialMecOptions()[0],
  paymentMethodsOptions: initialPaymentMethodsOptions(),
  selectedPaymentMethodsOption: initialPaymentMethodsOptions()[0],
  debtOptions: initialDebtOption(),
  selectedDebtOption: initialDebtOption()[0],
  searchTypeOptions: [
    {value: '1', label: '# Factura'},
    {value: '2', label: '# P. Interno'},
  ],
  selectedSearchType: {value: '1', label: '# Factura'},
  searchTerm: '',
  clientContact: null,
  barsData: null,
  invoices: [],
  itemsStatus: API_REQUEST_STATUS_DEFAULT,
});
export const tabOptions = (): Array<ITabOption> => [
  {
    id: '1',
    label: 'Todas las empresas',
    activeSubtitle: true,
    labelSubtitle: 'facturas',
    totalSubtitle: 0,
  },
];
export const initialPaymentMethodsOptions = (): Array<DropListOption> => [
  {
    value: '1',
    label: ALL_VALUE,
  },
];
export const DEBT_STATUS_OPTIONS = {
  2: 'EnTiempoVerde',
  3: 'VencidaAmarillo',
  4: 'VencidaNaranja',
  5: 'VencidaRojo',
  6: 'Morosa',
};
