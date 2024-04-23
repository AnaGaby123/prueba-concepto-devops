import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {CatTipoNumeroTelefonico, VCliente} from 'api-catalogos';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {
  CotPartidaCotizacionCapacitacionFecha,
  CotPromesaDeCompraPartida,
  GMCotFletes,
  VCotCotizacion,
  VPartidaCotizacion,
} from 'api-logistica';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface IFollowPPromiseDetails {
  selectedClient: ICustomerFPP;
  clientData?: IFollowPPromiseClientData;
  searchTerm: string;
  searchOptions: Array<DropListOption>;
  quotation: VCotCotizacion;
  freightsQuotation: GMCotFletes;
  selectedSearchOption: DropListOption;
  items: IFollowPPromiseItems;
  apiStatus: number;
  promiseIsSelected?: boolean;
  dateForPurchasePromise?: Date;
  dateForPurchasePromiseString?: string;
  justification?: string;
  justifications?: CotPromesaDeCompraPartida[];
}

export interface IFollowPPromiseItems {
  TotalResults: number;
  Results: Array<IFollowPPromiseItem>;
}

export interface IFollowPPromiseItem extends VPartidaCotizacion {
  Index: number;
  isSelected?: boolean;
  children?: Array<IFollowPPromiseItem>;
  isChild?: boolean;
  freightItem?: IFreightItem;
  imageHover?: string;
  datesTraining?: CotPartidaCotizacionCapacitacionFecha[];
}

export interface IFollowPPromiseClientData {
  selectedClient: ICustomerFPP;
  vCliente?: VCliente;
  phoneTypes?: Array<CatTipoNumeroTelefonico>;
  contacts?: Array<IContact>;
}

export const initialIFollowPPromiseDetails = (): IFollowPPromiseDetails => ({
  selectedClient: {} as ICustomerFPP,
  clientData: {} as IFollowPPromiseClientData,
  quotation: {} as VCotCotizacion,
  freightsQuotation: {} as GMCotFletes,
  searchTerm: '',
  searchOptions: [
    {
      value: '1',
      label: 'Catálogo',
    },
    {
      value: '2',
      label: 'Concepto',
    },
    {
      value: '3',
      label: 'Marca',
    },
  ],
  selectedSearchOption: {
    value: '1',
    label: 'Catálogo',
  },
  items: {
    TotalResults: 0,
    Results: null,
  },
  apiStatus: API_REQUEST_STATUS_DEFAULT,
  promiseIsSelected: false,
  justification: '',
  justifications: [],
});
export const searchFields = {
  1: 'Catalogo',
  2: 'Descripcion',
  3: 'NombreMarca',
};
