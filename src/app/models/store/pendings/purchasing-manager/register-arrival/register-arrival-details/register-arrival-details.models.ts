/* Models Imports */
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {IFile} from '@appModels/files/files.models';
import {IPorter} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {OcPackingList, ProveedorOcPartidaPackingListObj, VRAImpOrdenDespacho} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Common Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_SUCCEEDED,
  HIGHER_VALUE,
  LOWER_VALUE,
} from '@appUtil/common.protocols';

export interface IRegisterArrivalDetails {
  barcodeComponent: IBarcodeComponent;
  stepsComponent: IStepsComponent;
}

export const initialIRegisterArrivalDetails = (): IRegisterArrivalDetails => ({
  barcodeComponent: initialIBarcodeComponent(),
  stepsComponent: initialIStepsComponent(),
});

export interface IBarcodeComponent {
  searchTerm: string;
  dataByType: Array<DropListOption>;
  dataByTypeSelected: DropListOption;
  porterSelected: IPorter;
  dispatchOrders: Array<IDispatchOder>;
  needsToReloadDispatchOrders: boolean;
  dispatchOrdersStatus: number;
  dispatchOrderSelected: IDispatchOder;
  allowedToBarcode: boolean;
  isInBarcodeView: boolean;
}

export const initialIBarcodeComponent = (): IBarcodeComponent => ({
  searchTerm: '',
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  dataByTypeSelected: {value: '1', label: HIGHER_VALUE},
  porterSelected: {} as IPorter,
  dispatchOrders: [],
  needsToReloadDispatchOrders: true,
  dispatchOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
  dispatchOrderSelected: {} as IDispatchOder,
  allowedToBarcode: false,
  isInBarcodeView: false,
});

export interface IStepsComponent {
  steps: Array<BarActivityOption>;
  stepSelected: number;
  packageImages: Array<IFile>;
  providersWithItems: Array<IProvidersPiecesArrived>;
  providersWithItemsStatus: number;
  providersWithItemsNeedsToReload: boolean;
  packingListObj: Array<OcPackingList>;
  codeSecurityGuard: Array<number>;
  shakedSecurityGuard: boolean;
  codeSecurityGuardIsValid: boolean;
  authorizationRequestChangeSecurity: string;
  codeBuyer: Array<number>;
  shakedBuyer: boolean;
  codeBuyerIsValid: boolean;
  authorizationRequestChangeBuyer: string;
  allowedToSteps: boolean;
  isInStepsView: boolean;
}

export const initialIStepsComponent = (): IStepsComponent => ({
  steps: [
    {
      id: 1,
      label: 'Fotografía de Paquete Abierto',
    },
    {
      id: 2,
      label: 'Piezas Arribadas',
    },
    {
      id: 3,
      label: 'Escaneo de Huella',
    },
  ],
  stepSelected: 0,
  packageImages: [],
  providersWithItems: [],
  providersWithItemsStatus: API_REQUEST_STATUS_DEFAULT,
  providersWithItemsNeedsToReload: true,
  packingListObj: [],
  codeSecurityGuard: [null, null, null, null],
  authorizationRequestChangeSecurity: null,
  shakedSecurityGuard: false,
  codeSecurityGuardIsValid: false,
  codeBuyer: [null, null, null, null],
  shakedBuyer: false,
  codeBuyerIsValid: false,
  authorizationRequestChangeBuyer: null,
  allowedToSteps: false,
  isInStepsView: false,
});

export interface IDispatchOder extends VRAImpOrdenDespacho {
  Index?: number;
}

export interface IProvidersPiecesArrived extends ProveedorOcPartidaPackingListObj {
  Index: number;
  isOpen: boolean;
  arrived: number;
}

export interface ITotalsPiecesArrived {
  toArrived: number;
  arrived: number;
  missing: number | string;
  surplus: number | string;
}
