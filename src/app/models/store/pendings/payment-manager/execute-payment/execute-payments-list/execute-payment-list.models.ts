import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IChip} from '@appModels/chip/chip';
import {ALL_VALUE} from '@appUtil/common.protocols';

export interface IExecutePaymentList {
  tabOptions: Array<ITabOption>;
  selectedTabOption: ITabOption;
  weekTab: IWeek;
  monthTab: IMonth;
}

export interface IMonth {
  providerOptions: Array<DropListOption>;
  selectedProviderOption: DropListOption;
  paymentStatusOptions: Array<DropListOption>;
  selectedPaymentStatusOption: DropListOption;
  typePaymentOptions: Array<DropListOption>;
  selectedTypePaymentOption: DropListOption;
  fromCalendar: Date;
  toCalendar: Date;
  fromCalendarString: string;
  toCalendarString: string;
  paymentsResults: Array<any>;
}

export interface IWeek {
  searchTerm: string;
  paymentOptions: Array<DropListOption>;
  selectedPaymentOption: DropListOption;
  chipOptions: Array<IChip>;
}

export const initialIExecutePaymentList = (): IExecutePaymentList => ({
  tabOptions: [
    {
      id: '1',
      label: 'Semana',
    },
    {
      id: '2',
      label: 'Mes',
    },
  ],
  selectedTabOption: {
    id: '1',
    label: 'Semana',
  },
  weekTab: initialIWeekTabPayment(),
  monthTab: initialIMonthTabPayment(),
});

export const initialIWeekTabPayment = (): IWeek => ({
  searchTerm: '',
  paymentOptions: [
    {value: '1', label: 'Todos'},
    {value: '2', label: 'A Tiempo (-8 a 0 Días)', circleColor: '#4ba92b'},
    {value: '3', label: 'Vencido (+1 a +8 Días)', circleColor: '#f5b750'},
  ],
  selectedPaymentOption: {value: '1', label: 'Todos'},
  chipOptions: [
    {
      value: '1',
      label: 'A pagar',
      total: 99000,
      active: true,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
    {
      value: '2',
      label: 'Pagado',
      total: 0,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
    {
      value: '3',
      label: 'En revisión',
      total: 20000,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
  ],
});

export const initialIMonthTabPayment = (): IMonth => ({
  providerOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Nombre de Proveedor S.A. de C.V.'},
  ],
  selectedProviderOption: {
    value: '1',
    label: ALL_VALUE,
  },
  paymentStatusOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'A Tiempo (-8 a 0 Días)', circleColor: '#4ba92b'},
    {value: '3', label: 'Vencido (+1 a +8 Días)', circleColor: '#f5b750'},
  ],
  selectedPaymentStatusOption: {
    value: '1',
    label: ALL_VALUE,
  },
  typePaymentOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Directos'},
    {value: '3', label: 'Indirectos'},
  ],
  selectedTypePaymentOption: {
    value: '1',
    label: ALL_VALUE,
  },
  fromCalendar: new Date(),
  toCalendar: new Date(),
  fromCalendarString: '21/02/2022',
  toCalendarString: '21/02/2022',
  paymentsResults: [],
});
