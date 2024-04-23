import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {
  OcPartidaCancelacion,
  OcPartidaEdicionBackOrder,
  OcPartidaEdicionConImpactoFEE,
  OcPartidaEdicionSinImpactoFEE,
  VOcOrdenDeCompra,
  VOcPartidaDetalle,
} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ContactoDetalleObj} from 'api-catalogos';

export interface IRegisterConfirmationDetails {
  providerSelected: IProvider;
  families: Array<IFamily>;
  selectedFamily: IFamily;
  itemsStatus?: number;
  ordersStatus?: number;
  tabOptions: Array<ITabOption>;
  providerContacts: Array<ContactoDetalleObj>;
  selectedProviderContact: DropListOption;
}

export const initialIRegisterConfirmationDetails = (): IRegisterConfirmationDetails => ({
  providerSelected: {} as IProvider,
  families: [],
  selectedFamily: {} as IFamily,
  itemsStatus: API_REQUEST_STATUS_DEFAULT,
  ordersStatus: API_REQUEST_STATUS_DEFAULT,
  tabOptions: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 60,
    },
    {
      id: '2',
      label: '3 + DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 60,
    },
    {
      id: '3',
      label: '3 DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 60,
    },
    {
      id: '4',
      label: '2 DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 60,
    },
    {
      id: '5',
      label: '1 DÍA',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 60,
    },
  ],
  providerContacts: [],
  selectedProviderContact: null,
});

// FIXME: Corregir por cambio en modelos
export interface IFamily {
  /*export interface IFamily extends VOcProveedorFamiliaNoConfirmada {*/
  isSelected: boolean;
  purchaseOrders: Array<IOrdersFamily>;
  needsToReloadOrders: boolean;
  selectedOrder: IOrdersFamily;
  selectedTabOption?: ITabOption;
  searchTerm?: string;
}

export interface IOrdersFamily extends VOcOrdenDeCompra {
  Index: number;
  isSelected: boolean;
  needsToReloadItems: boolean;
  items: Array<Array<IItemsFamily>>;
  selectedPaymentMedia: DropListOption;
  selectedPaymentConditions: DropListOption;
}

export interface IItemsFamily extends VOcPartidaDetalle {
  Index?: number;
  Number?: number;
  NumberToSave?: number;
  tempId?: string;
  tempNumeroDePiezas?: number;
  tempPrecioLista?: number;
  tempTotalPartida?: number;
  tempFechaEstimadaDeArribo?: string;
  cancelStatus: string;
  backOrderStatus: string;
  impactStatus: string;
  withoutImpactStatus: string;
  cancelConfig: boolean;
  backOrderConfig: boolean;
  impactConfig: boolean;
  withoutImpactConfig: boolean;
  configIsOpen: boolean;
  ocPartidaCancelacion: OcPartidaCancelacion;
  ocPartidaEdicionBackOrder: IOcPartidaEdicionBackOrder;
  ocPartidaEdicionConImpactoFEE: IOcPartidaEdicionConImpactoFEE;
  ocPartidaEdicionSinImpactoFEE: IOcPartidaEdicionSinImpactoFEE;
}

export interface IListTotals {
  number: number;
  pieces: number;
  products?: number;
  amount: number;
}

export interface IItemsConfigTotals {
  cancel: number;
  backOrder: number;
  impact?: number;
  withoutImpact?: number;
  confirmed?: number;
}

export interface IOcPartidaEdicionBackOrder extends OcPartidaEdicionBackOrder {
  FechaEstimadaArriboDate?: Date;
  FechaEstimadaDisponibilidadProveedorDate?: Date;
  FechaEstimadaEntregaDate?: Date;
  FechaMonitoreoDate?: Date;
  File?: File;
}

export interface IOcPartidaEdicionConImpactoFEE extends OcPartidaEdicionConImpactoFEE {
  FechaEstimadaArriboDate: Date;
  FechaEstimadaEntregaDate: Date;
  File?: File;
}

export interface IOcPartidaEdicionSinImpactoFEE extends OcPartidaEdicionSinImpactoFEE {
  FechaEstimadaArriboDate: Date;
}

export const initialSelectedTabOption = (): ITabOption => ({
  id: '1',
  label: 'TODOS',
  activeSubtitle: true,
  labelSubtitle: 'PZAS',
  totalSubtitle: 60,
});
export const initialItem = (): IItemsFamily => ({
  cancelStatus: STATUS.default,
  backOrderStatus: STATUS.default,
  impactStatus: STATUS.default,
  withoutImpactStatus: STATUS.default,
  cancelConfig: false,
  backOrderConfig: false,
  impactConfig: false,
  withoutImpactConfig: false,
  configIsOpen: false,
  ocPartidaCancelacion: {...initialOcPartidaCancelacion()},
  ocPartidaEdicionBackOrder: {...initialOcPartidaEdicionBackOrder()},
  ocPartidaEdicionConImpactoFEE: {...initialOcPartidaEdicionConImpactoFEE()},
  ocPartidaEdicionSinImpactoFEE: {...initialOcPartidaEdicionSinImpactoFEE()},
});
export const initialOcPartidaCancelacion = () => ({
  Activo: true,
  Descontinuado: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdOcPartidaCancelacion: DEFAULT_UUID,
  Justificacion: null,
  NumeroDePiezas: null,
  RestriccionesImportacion: false,
  RestriccionesVenta: false,
});
export const initialOcPartidaEdicionBackOrder = () => ({
  Activo: true,
  EnviarAStock: false,
  FechaEstimadaArribo: null,
  FechaEstimadaDisponibilidadProveedor: null,
  FechaEstimadaEntrega: null,
  FechaMonitoreo: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivo: null,
  IdOcPartidaEdicionBackOrder: DEFAULT_UUID,
  Justificacion: null,
  NumeroDePiezas: null,
  PorCancelar: false,
  PorGestionar: true,
  FechaEstimadaArriboDate: null,
  FechaEstimadaDisponibilidadProveedorDate: null,
  FechaEstimadaEntregaDate: null,
  FechaMonitoreoDate: null,
  File: null,
});
export const initialOcPartidaEdicionConImpactoFEE = () => ({
  Activo: true,
  Disponibilidad: false,
  FechaEstimadaArribo: null,
  FechaEstimadaEntrega: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivo: null,
  IdOcPartidaEdicionConImpactoFEE: DEFAULT_UUID,
  Justificacion: null,
  MotivosDesconocidos: false,
  NumeroDePiezas: null,
  Produccion: false,
  FechaEstimadaArriboDate: null,
  FechaEstimadaEntregaDate: null,
});
export const initialOcPartidaEdicionSinImpactoFEE = () => ({
  Activo: true,
  FechaEstimadaArribo: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdOcPartidaEdicionSinImpactoFEE: DEFAULT_UUID,
  NumeroDePiezas: null,
  FechaEstimadaArriboDate: null,
});
export const initialChildItem = () => ({
  cancelConfig: false,
  backOrderConfig: false,
  impactConfig: false,
  withoutImpactConfig: false,
  configIsOpen: false,
});
export const DAYS = {
  2: 'AMasDe3Dias',
  3: 'A3Dia',
  4: 'A2Dias',
  5: 'A1Dia',
};
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
  backOrder: 'backOrder',
  impact: 'impact',
  withoutImpact: 'withoutImpact',
  confirm: 'confirm',
};
