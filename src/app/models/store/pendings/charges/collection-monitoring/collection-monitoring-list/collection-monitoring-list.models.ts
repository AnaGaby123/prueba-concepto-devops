import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IChip} from '@appModels/chip/chip';
import {CalendarioEjecutarCobranzaPeriodo} from 'api-finanzas';
import {
  CALENDAR_VIEW_TYPES,
  todayDate,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface ICollectionMonitoringList {
  tabOptions: Array<ITabOption>;
  selectedTabOption: ITabOption;
  weekTab: IWeek;
  monthTab: IMonth;
}

export interface IWeek {
  queryInfo: IQueryInfoOptions;
  chipOptions: Array<IChip>;
  calendarWeek: CalendarioEjecutarCobranzaPeriodo;
  actualWeek: Array<string>;
  currentDate: Date;
  calendarApiStatus: number;
}

export interface IMonth {
  fromCalendar: Date;
  toCalendar: Date;
  fromCalendarString: string;
  toCalendarString: string;
  clientOptions: Array<DropListOption>;
  selectedClientOption: DropListOption;
  collectionStatusOptions: Array<DropListOption>;
  selectedCollectionStatusOption: DropListOption;
  typeCollectionOptions: Array<DropListOption>;
  selectedTypeCollectionOption: DropListOption;
  collectionResultList: Array<any>;
  typeClientOptions: Array<DropListOption>;
  selectedTypeClientOption: DropListOption;
}

export const initialICollectionMonitoringList = (): ICollectionMonitoringList => ({
  tabOptions: initialCalendarTabOptions(),
  selectedTabOption: initialCalendarTabOptions()[0],
  weekTab: initialCollectionMonitoringWeek(),
  monthTab: initialCollectionMonitoringMonth(),
});
export const initialCalendarTabOptions = (): Array<ITabOption> => [
  {
    id: '1',
    label: CALENDAR_VIEW_TYPES.week,
    activeSubtitle: false,
  },
  {
    id: '2',
    label: CALENDAR_VIEW_TYPES.month,
    activeSubtitle: false,
  },
];
export const CHIP_FILTERS = {
  2: 'TieneEnTiempoVerde',
  3: 'TieneSinMonitoreos',
  4: 'TieneCobroNoRecibido',
};

export const initialCollectionMonitoringWeek = (): IWeek => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  chipOptions: [
    {
      value: '1',
      label: 'Todos',
      totalLabel: 'Facturas',
      total: 0,
      active: true,
      disable: false,
      color: '#008894',
      colorDefault: '#00889490',
    },
    {
      value: '2',
      label: 'En tiempo',
      totalLabel: 'Facturas',
      total: 0,
      active: false,
      disable: false,
      color: '#4ba92b',
      colorDefault: '#4ba92b90',
    },
    {
      value: '3',
      label: 'Sin monitoreo',
      totalLabel: 'Facturas',
      total: 0,
      active: false,
      disable: false,
      color: '#eca735',
      colorDefault: '#eca73590',
    },
  ],
  calendarWeek: {} as CalendarioEjecutarCobranzaPeriodo,
  actualWeek: [],
  currentDate: todayDate(),
  calendarApiStatus: API_REQUEST_STATUS_DEFAULT,
});

export const initialCollectionMonitoringMonth = (): IMonth => ({
  clientOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Nombre de Proveedor S.A. de C.V.'},
  ],
  selectedClientOption: {
    value: '1',
    label: ALL_VALUE,
  },
  collectionStatusOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'A tiempo', circleColor: '#4ba92b'},
    {value: '3', label: 'Sin Monitoreo', circleColor: '#f5b750'},
    {value: '4', label: 'Cobro No Recibido', circleColor: '#d81414'},
  ],
  selectedCollectionStatusOption: {
    value: '1',
    label: ALL_VALUE,
  },
  typeCollectionOptions: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Recibidos'},
    {value: '3', label: 'No Recibidos'},
  ],
  selectedTypeCollectionOption: {
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
  collectionResultList: [],
});
