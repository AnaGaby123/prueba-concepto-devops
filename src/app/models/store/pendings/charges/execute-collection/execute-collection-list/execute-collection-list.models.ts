import {ITabOption} from '@appModels/botonera/botonera-option';
import {IChip} from '@appModels/chip/chip';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CalendarioEjecutarCobranzaPeriodo} from 'api-finanzas';
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IExecuteCollectionCalendar {
  tabOptions: Array<ITabOption>;
  tabSelected: ITabOption;
  weekTab: IWeek;
  monthTab: IMonth;
}

export interface IMonth {
  fromCalendar: Date;
  toCalendar: Date;
  fromCalendarString: string;
  toCalendarString: string;
  clientOptions: Array<DropListOption>;
  selectedClientOption: DropListOption;
  paymentStatusOptions: Array<DropListOption>;
  selectedPaymentStatusOption: DropListOption;
  typePaymentOptions: Array<DropListOption>;
  selectedTypePaymentOption: DropListOption;
  paymentsResultList: Array<any>;
  typeClientOptions: Array<DropListOption>;
  selectedTypeClientOption: DropListOption;
}

export interface IWeek {
  searchTerm: string;
  chips: Array<IChip>;
  chargesOptions: Array<DropListOption>;
  chargeOptionSelected: DropListOption;
  calendarWeek: CalendarioEjecutarCobranzaPeriodo;
  actualWeek: Array<string>;
  selectedWeek: Date;
  dayStatus: number;
}

export const todayDate = () => {
  let today: Date = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const search = today.toISOString();
  const date = search.split('T');
  today = new Date(date[0]);
  return today;
};
export const initialIExecuteCollectionCalendar = (): IExecuteCollectionCalendar => ({
  tabOptions: [
    {
      id: '1',
      label: CALENDAR_VIEW_TYPES.week,
    },
    {
      id: '2',
      label: CALENDAR_VIEW_TYPES.month,
    },
  ],
  tabSelected: {
    id: '1',
    label: CALENDAR_VIEW_TYPES.week,
  },
  weekTab: initialExecuteCollectionTabPaymentWeek(),
  monthTab: initialExecuteCollectionTabPaymentMonth(),
});
export const CALENDAR_VIEW_TYPES = {
  week: 'Semana',
  month: 'Mes',
};

export const initialExecuteCollectionTabPaymentWeek = (): IWeek => ({
  searchTerm: '',
  chips: [
    {
      value: '1',
      label: 'A cobrar',
      total: 0,
      active: true,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
    {
      value: '2',
      label: 'Cobrado',
      total: 0,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
    {
      value: '3',
      label: 'En revisión',
      total: 0,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
  ],
  chargesOptions: [
    {
      value: '1',
      label: 'Todos',
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
  ],
  chargeOptionSelected: {
    value: '1',
    label: ALL_VALUE,
  },
  calendarWeek: {} as CalendarioEjecutarCobranzaPeriodo,
  actualWeek: [],
  selectedWeek: todayDate(),
  dayStatus: API_REQUEST_STATUS_DEFAULT,
});
export const initialExecuteCollectionTabPaymentMonth = (): IMonth => ({
  clientOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Nombre de Proveedor S.A. de C.V.'},
  ],
  selectedClientOption: {
    value: '1',
    label: ALL_VALUE,
  },
  paymentStatusOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'A Tiempo (-8 a 0 Días)', circleColor: '#4ba92b'},
    {value: '3', label: 'Vencido (+1 a +8 Días)', circleColor: '#f5b750'},
    {value: '4', label: 'Vencido (+9 a +16 Días)', circleColor: '#ec6d44'},
    {value: '5', label: 'Vencido (+17 a  +179 Días )', circleColor: '#d81414'},
    {value: '6', label: 'Moroso (+180 Días en adelante)', circleColor: '#6a6aae'},
  ],
  selectedPaymentStatusOption: {
    value: '1',
    label: ALL_VALUE,
  },
  typePaymentOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Recibido'},
    {value: '3', label: 'No Recibido'},
  ],
  selectedTypePaymentOption: {
    value: '1',
    label: ALL_VALUE,
  },
  typeClientOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Con Crédito'},
    {value: '3', label: 'Sin Crédito'},
  ],
  selectedTypeClientOption: {
    value: '1',
    label: ALL_VALUE,
  },
  fromCalendar: new Date(),
  toCalendar: new Date(),
  fromCalendarString: '',
  toCalendarString: '',
  paymentsResultList: [],
});
