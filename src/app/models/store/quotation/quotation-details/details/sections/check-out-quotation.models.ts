import {ITabOption} from '@appModels/botonera/botonera-option';
import {IToggleSwitch} from '@appModels/toggle-switch/toggle-switch';
import {
  QUOTATION_TYPE_PARTIAL,
  QUOTATION_TYPE_TOTAL,
  SWITCH_DEFAULT,
} from '@appUtil/common.protocols';
import {IItemQuotationWithProduct} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {ProveedorObj, VFleteObj} from 'api-catalogos';

export interface ICheckOutQuotation {
  options: Array<ITabOption>;
  tapSelected: ITabOption;
  searchTerm: string;
  optionSwitch: IToggleSwitch;
  itemQuotationSelected: IItemQuotationWithProduct;
  modalIsOpenSendQuotation: boolean;
}

export const initialCheckOutQuotation = (): ICheckOutQuotation => ({
  options: [
    {
      id: '1',
      label: 'Productos Disponibles · ',
      activeSubtitle: false,
    },
    {
      id: '2',
      label: 'Productos a Investigacion · ',
      activeSubtitle: false,
    },
  ],
  tapSelected: {
    id: '1',
    label: 'Productos · 0',
    activeSubtitle: false,
  },
  searchTerm: '',
  optionSwitch: {
    leftOptionText: QUOTATION_TYPE_PARTIAL,
    rightOptionText: QUOTATION_TYPE_TOTAL,
    selected: SWITCH_DEFAULT,
    fontSize: '14px',
  },
  itemQuotationSelected: {
    needsToReloadProduct: true,
    product: {},
    priceUnit: 0,
    Index: 1,
    activeInputPieces: false,
    activeInputControlled: false,
  },
  modalIsOpenSendQuotation: false,
});

export interface IDataClient {
  name: string;
  folio: string;
  piezas: number;
  productos: number;
  deliveryRoute: string;
}

export interface IFreight {
  listFreightsExpress: {
    needToReload: boolean;
    list: IFreightExpress[];
    listBackUp: IFreightExpress[];
  };
  lastMileFreights: {
    needToReload: boolean;
    list: IFlete[];
    listBackUp: IFlete[];
  };
}

export interface IFreightExpress extends ProveedorObj {
  isSelected?: boolean;
}

export interface IFlete extends VFleteObj {
  isSelected?: boolean;
}
