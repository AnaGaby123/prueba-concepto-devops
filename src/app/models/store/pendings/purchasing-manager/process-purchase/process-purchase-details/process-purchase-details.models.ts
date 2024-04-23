/* Models Imports */
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {OcOrdenDeCompra, TramitarCompraElaborar, VProductoPendienteCompra} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';

import {Archivo, ContactoDetalleProvObj} from 'api-catalogos';

/* Tools Imports */
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {IPopUpData} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';

export interface IProcessPurchaseDetails {
  provider: IProvider;
  families: Array<IFamily>;
  totalFamilies: number;
  generalData: TramitarCompraElaborar;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
  generalDataStatus: number;
  needsToReloadGeneralData: boolean;
  companyBuysSelected: DropListOption;
  shippingCompanySelected: DropListOption;
  productsToGenerateOrder: Array<IProducts>;
  dataByType: Array<DropListOption>;
  dataByTypeSelected: DropListOption;
  popUpSendMail: boolean;
  purchaseOrderData: OcOrdenDeCompra;
  pdfData: Archivo;
  idPurchaseOrder: string;
  mailList: Array<IDropListMulti>;
  contacts: Array<IDropListMulti>;
  contactsStatus: number;
  needsToReloadContacts: boolean;
}

export const initialIProcessPurchaseDetails = (): IProcessPurchaseDetails => ({
  provider: {} as IProvider,
  families: [],
  totalFamilies: 0,
  generalData: {} as TramitarCompraElaborar,
  providerContacts: [],
  selectedProviderContact: null,
  generalDataStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadGeneralData: true,
  companyBuysSelected: null,
  shippingCompanySelected: null,
  productsToGenerateOrder: [],
  dataByType: [
    {value: '1', label: 'FEE Más Próxima'},
    {value: '2', label: 'FEE Menos Próxima'},
  ],
  dataByTypeSelected: {value: '1', label: 'FEE Más Próxima'},
  popUpSendMail: false,
  purchaseOrderData: {} as OcOrdenDeCompra,
  pdfData: {} as Archivo,
  idPurchaseOrder: null,
  mailList: [],
  contacts: [],
  contactsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadContacts: true,
});
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export interface IFamily extends TramitarCompraElaborarCarritoCarrusel {*/
export interface IFamily {
  isSelected: boolean;
  products: Array<IProducts>;
  totalProducts: number;
  needsToReloadProducts: boolean;
  productsStatus: number;
  desiredPage: number;
  isLoadingMoreProducts: boolean;
  tabOptions: Array<ITabOption>;
  tabSelected: ITabOption;
  searchTerm: string;
}

export interface IProducts extends VProductoPendienteCompra {
  Index: number;
  control: string;
  stockPop?: IPopUpData;
}

export interface ICurrentTotals {
  allPieces: number;
  regulars: number;
  scheduled: number;
  freigthExpress: number;
  stock: number;
  results: number;
  amount: number;
}
