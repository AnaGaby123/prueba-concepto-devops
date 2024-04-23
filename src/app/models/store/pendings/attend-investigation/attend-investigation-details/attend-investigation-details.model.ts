import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  initialListProduct,
  IProduct,
  ListProductsForm,
} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {
  initialProductsDetails,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {
  initialAttendInvestigationTabOptions,
  IProvider,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {
  CotInvestigacionCorreoEnviado,
  CotPartidaInvetigacionAtencionComentariosObj,
  GMPartidaInvestigacionRespuestaProveedor,
  ProductoInvestigacionObj,
} from 'api-logistica';

export interface IAttendInvestigationDetails {
  filterOptions: Array<DropListOption>;
  filterSelected: DropListOption;
  productDetails: ProductsDetails;
  productInvestigationList: Array<IProductInvestigation>;
  productInvestigationApiStatus: number;
  productList: ListProductsForm;
  providerSelected: IProvider;
  tabOptionSelected: ITabOption;
  tabOptions: Array<ITabOption>;
  providerContacts: Array<IDropListMulti>;
}

export const initialIAttendInvestigationDetails = (): IAttendInvestigationDetails => ({
  providerSelected: {} as IProvider,
  tabOptions: initialAttendInvestigationTabOptions(),
  tabOptionSelected: initialAttendInvestigationTabOptions()[0],
  filterOptions: [
    {
      value: '1',
      label: 'Ver por todos',
    },
    {
      value: '2',
      label: 'Ver nuevos',
    },
    {
      value: '3',
      label: 'Ver por reatender',
    },
  ],
  filterSelected: {
    value: '1',
    label: 'Ver por todos',
  },
  productList: initialListProduct(),
  productDetails: initialProductsDetails(),
  productInvestigationList: [],
  productInvestigationApiStatus: API_REQUEST_STATUS_DEFAULT,
  providerContacts: [],
});

export interface IProductInvestigation extends ProductoInvestigacionObj {
  index: number;
  selected: boolean;
  detailsOpen: boolean;
  isChecked: boolean;
  needsToReloadAttention: boolean;
  isOnlineInvestigation: boolean;
  gmItemAttention?: ICotPartidaInvetigacionAtencionComentariosObj;
  gmProviderResponse?: IProviderResponse;
  backup: any;
}

export interface ICotPartidaInvetigacionAtencionComentariosObj
  extends CotPartidaInvetigacionAtencionComentariosObj {
  Producto?: IProduct;
}

export interface IProviderResponse extends GMPartidaInvestigacionRespuestaProveedor {
  file: File;
}

export const initialIGmItemAttention = (): ICotPartidaInvetigacionAtencionComentariosObj => ({
  Producto: null,
  cotPartidaCotizacionInvestigacion: {},
  cotPartidaCotizacionInvestigacionAtencion: {
    Activo: true,
    FechaAtencion: DEFAULT_DATE,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCotPartidaCotizacionInvestigacion: DEFAULT_UUID,
    IdCotPartidaCotizacionInvestigacionAtencion: DEFAULT_UUID,
    IdProducto: null,
    ProductoDisponible: false,
    Sugerencias: false,
  },
  cotPartidaCotizacionInvestigacionComentario: [
    {
      Activo: true,
      Comentario: '',
      ComentarioEVI: false,
      ComentarioInvestigador: true,
      FechaRegistro: DEFAULT_DATE,
      IdCotPartidaCotizacionInvestigacion: DEFAULT_UUID,
      IdCotPartidaCotizacionInvestigacionComentario: DEFAULT_UUID,
    },
  ],
});
export const initialIProviderResponse = (): IProviderResponse => ({
  IdUsuarioAtiende: null,
  cotPartidaInvestigacionProducto: {
    Activo: true,
    Encontrado: false,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdArchivoEvidenciaProvedor: DEFAULT_UUID,
    IdCotPartidaCotizacionInvestigacion: null,
    IdCotPartidaInvestigacionProducto: DEFAULT_UUID,
    IdProducto: null,
    NoEncontrado: false,
    Notas: '',
  },
  file: null,
});
export const initialCotInvestigacionCorreoEnviado = (
  greetings: string,
  body: string,
): CotInvestigacionCorreoEnviado => ({
  Activo: true,
  SaludoCorreo: greetings,
  CuerpoCorreo: body,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Notas: '',
  IdProveedor: null,
  IdUsuarioEnvia: DEFAULT_UUID,
  IdCotInvestigacionCorreoEnviado: DEFAULT_UUID,
  IdCorreoEnviado: DEFAULT_UUID,
});
