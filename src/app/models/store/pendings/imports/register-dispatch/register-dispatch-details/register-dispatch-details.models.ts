import {ICustomBroken} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {
  CalcularMontosImportacion,
  VRDImpOrdenDespacho,
  VRDProveedorOrdenDespachoDetalle,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IRegisterDispatchDetails {
  searchTerm: string;
  selectedCustomBroker: ICustomBroken;
  dispatchOrders: Array<IDispatchOrder>;
  selectedDispatchOrder: IDispatchOrder;
  actualStep: number;
  itemsStatus?: number;
  dispatchOrdersStatus?: number;
  needsToReloadOrders: boolean;
  minutesList: Array<DropListOption>;
  hoursList: Array<DropListOption>;
  usersList: Array<DropListOption>;
}

export interface IDispatchOrder extends VRDImpOrdenDespacho {
  Index: number;
  isSelected: boolean;
  items: Array<IItemsDispatchOrder>;
  needsToReloadItems: boolean;
  selectedBuyerUser?: DropListOption;
  FechaHoraEstimadaArriboDate?: Date;
  selectedEnterHrs?: DropListOption;
  selectedEnterMinutes?: DropListOption;
  FechaHoraEstimadaSalidaAduanaDate?: Date;
  selectedOutHrs?: DropListOption;
  selectedOutMinutes?: DropListOption;
  petitionFile?: File;
  evidenceFiles?: Array<File>;
}

export interface IItemsDispatchOrder extends VRDProveedorOrdenDespachoDetalle {
  Index?: number;
}

export interface IItemsTotals extends CalcularMontosImportacion {
  Items?: number;
  IMP?: number;
  VAD?: number;
  Piezas?: number;
}

export const initialIRegisterDispatchDetails = (): IRegisterDispatchDetails => ({
  searchTerm: '',
  selectedCustomBroker: {} as ICustomBroken,
  dispatchOrders: [],
  selectedDispatchOrder: {} as IDispatchOrder,
  actualStep: 1,
  itemsStatus: API_REQUEST_STATUS_DEFAULT,
  dispatchOrdersStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadOrders: true,
  minutesList: [
    {
      value: '1',
      label: '00',
    },
    {
      value: '2',
      label: '05',
    },
    {
      value: '3',
      label: '10',
    },
    {
      value: '4',
      label: '15',
    },
    {
      value: '5',
      label: '20',
    },
    {
      value: '6',
      label: '25',
    },
    {
      value: '7',
      label: '30',
    },
    {
      value: '8',
      label: '35',
    },
    {
      value: '9',
      label: '40',
    },
    {
      value: '10',
      label: '45',
    },
    {
      value: '11',
      label: '50',
    },
    {
      value: '12',
      label: '55',
    },
  ],
  hoursList: [
    {
      value: '1',
      label: '08',
    },
    {
      value: '2',
      label: '09',
    },
    {
      value: '3',
      label: '10',
    },
    {
      value: '4',
      label: '11',
    },
    {
      value: '5',
      label: '12',
    },
    {
      value: '6',
      label: '13',
    },
    {
      value: '7',
      label: '14',
    },
    {
      value: '8',
      label: '15',
    },
    {
      value: '9',
      label: '16',
    },
    {
      value: '10',
      label: '17',
    },
    {
      value: '11',
      label: '18',
    },
  ],
  usersList: [],
});
