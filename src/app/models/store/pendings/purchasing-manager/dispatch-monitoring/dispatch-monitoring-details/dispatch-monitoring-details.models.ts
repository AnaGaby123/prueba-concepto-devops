/* Models Imports */
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {
  ParametroCancelarGuiaMonitorearDespacho,
  ParametroConfirmarMonitorearDespacho,
  ParametroFEEMonitorearDespacho,
  VImpMDGuia,
  VOcPartidaDetalle,
} from 'api-logistica';

/* Common Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IDispatchMonitoringDetails {
  searchTerm: string;
  providerSelected: IProvidersDispatchMonitoring;
  guides: Array<IGuidesDispatchMonitoring>;
  guidesStatus: number;
  needsToReloadGuides: boolean;
  tabOptions: Array<ITabOption>;
  tabSelected: ITabOption;
  guideSelected: IGuidesDispatchMonitoring;
  openViewFile: boolean;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export const initialDispatchMonitoringDetails = (): IDispatchMonitoringDetails => ({
  searchTerm: '',
  providerSelected: {} as IProvidersDispatchMonitoring,
  guides: [],
  guidesStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadGuides: true,
  guideSelected: {} as IGuidesDispatchMonitoring,
  openViewFile: false,
  tabOptions: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: '3 + DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: '3 DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '4',
      label: '2 DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '5',
      label: '1 DÍA',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Todas',
    activeSubtitle: true,
    labelSubtitle: 'PZAS',
    totalSubtitle: 0,
  },
  providerContacts: [],
  selectedProviderContact: null,
});

export interface IGuidesDispatchMonitoring extends VImpMDGuia {
  Index: number;
  isSelected: boolean;
  items: Array<IItem>;
  itemsStatus: number;
  itemsNeedsToReload;
  cancelConfig: boolean;
  withImpactFeeConfig: boolean;
  confirmedConfig: boolean;
  guiaCancelacion: ParametroCancelarGuiaMonitorearDespacho;
  guiaImpactoFee: ParametroFEEMonitorearDespacho;
  guideConfirm: ParametroConfirmarMonitorearDespacho;
  file: File;
}

export const initialGuide = () => ({
  guiaCancelacion: {...initialGuiaCancelacion()},
  guiaImpactoFee: {...initialImpactFee()},
  guideConfirm: {...initialGuideConfirm()},
});

export interface IItem extends VOcPartidaDetalle {
  Index?: number;
  Number?: number;
  NumberToSave?: number;
  tempId?: string;
  tempFechaEstimadaDeArribo?: number;
  tempNumeroDePiezas?: number;
  tempPrecioLista?: number;
  tempTotalPartida?: number;
  cancelStatus: string;
  withImpactFeeStatus: string;
  confirmedStatus: string;
  cancelConfig: boolean;
  withImpactFeeConfig: boolean;
  confirmedConfig: boolean;
}

export const initialIItem = (): IItem => ({
  cancelStatus: STATUS.default,
  withImpactFeeStatus: STATUS.default,
  confirmedStatus: STATUS.default,
  cancelConfig: false,
  withImpactFeeConfig: false,
  confirmedConfig: false,
});

export interface IItemsConfigTotals {
  cancel: number;
  withImpact?: number;
  confirmed?: number;
}

export interface ITotalItems extends IItemsConfigTotals {
  totalResults: number;
  totalPieces: number;
  totalAmount: number;
  totalClients: number;
}

export const STATUS = {
  default: 'default',
  active: 'active',
  confirmed: 'confirmed',
  opacity: 'opacity',
  disabled: 'disabled',
  'disabled-default': 'disabled-default',
};
export const TYPES_OF_CONFIG = {
  cancel: 'cancel',
  impact: 'impact',
  confirm: 'confirm',
};
export const initialGuiaCancelacion = () => ({
  IdOcPackingList: DEFAULT_UUID,
  Justificacion: '',
});
export const initialImpactFee = () => ({
  IdArchivo: DEFAULT_UUID,
  IdOcPackingList: DEFAULT_UUID,
  FEA: DEFAULT_DATE,
  Justificacion: null,
});
export const initialGuideConfirm = () => ({
  IdOcPackingList: DEFAULT_UUID,
});
