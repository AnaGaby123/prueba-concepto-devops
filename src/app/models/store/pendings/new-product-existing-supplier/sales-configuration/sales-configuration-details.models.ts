import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {AutorizacionDetalle, Resumen} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, ENUM_SECURE_POP} from '@appUtil/common.protocols';
import {IImageItem} from '@appModels/shared/shared.models';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';

export interface ISalesConfigurationDetailsModel {
  title: string;
  enableEdit: boolean;
  searchTerm: string;
  filters: Array<FilterOptionPqf>;
  familiesList: Array<IFamiliesSalesConfig>;
  listItemsApiStatus: number;
  detailsFamilyStatus: number;
  selectedFamily: IFamiliesSalesConfig;
  preSelectedFamily: IFamiliesSalesConfig;
  isActivePop: boolean;
  IsActiveSecureCodePop: boolean;
  IsActiveMessageSecureCodePop: boolean;
  IsActiveDiscardMessageSecureCodePop: boolean;
  authorizationObj: IAuthorizationCodeObj;
  secureCode: Array<string>;
}

export const initialISalesConfigurationDetailsState = (): ISalesConfigurationDetailsModel => ({
  title: 'Configurar familia - Determinar rentabilidad',
  enableEdit: false,
  searchTerm: '',
  filters: [
    {
      id: '1',
      text: 'filters.newer',
      isActive: true,
      enable: true,
    },
    {
      id: '2',
      text: 'filters.older',
      isActive: false,
      enable: true,
    },
  ],
  familiesList: [],
  listItemsApiStatus: API_REQUEST_STATUS_DEFAULT,
  detailsFamilyStatus: API_REQUEST_STATUS_DEFAULT,
  selectedFamily: {},
  preSelectedFamily: {},
  isActivePop: false,
  IsActiveSecureCodePop: false,
  IsActiveMessageSecureCodePop: false,
  IsActiveDiscardMessageSecureCodePop: false,
  authorizationObj: {
    authorization: null,
    CodigoAutorizacion: '',
    valid: null,
    status: ENUM_SECURE_POP.default,
  },
  secureCode: [null, null, null, null],
});

export interface IFamiliesSalesConfig extends Resumen, IImageItem {
  AreaCorporativo?: string;
  CatControlNombre?: string;
  CatSubTipoProductoNombre?: string;
  CatTipoProductoNombre?: string;
  FechaCreacionPendiente?: string;
  IdActual?: string;
  IdAnterior?: string;
  IdCotPartidaCotizacionInvestigacion?: string;
  IdFamilia?: string;
  IdMarca?: string;
  IdMarcaFamiliaProveedor?: string;
  IdProveedor?: string;
  Index?: number;
  Mexicano?: string;
  NombreImagen?: string;
  NombreMarca?: string;
  NombreProveedor?: string;
  fullFamilyName?: string;
  isSelected?: boolean;
  needsToReload?: boolean;
  configuration?: Array<IVMarcaFamiliaIndustriaObj>;
  configurationBackUp?: Array<IVMarcaFamiliaIndustriaObj>;
}

export interface IVMarcaFamiliaIndustriaObj extends VMarcaFamiliaIndustriaObj {
  Index: number;
  needsToSave: boolean; // DOCS sirve para saber cuales van a ser las que se van a guardar si presentan algún cambio
  isOriginal: boolean; // DOCS Valida si inicialmente estaba marcada para que no se pueda deshabilitar
  inRevision: boolean; // DOCS Valida si estara eb revision por algun cambio en algun input
}

export interface IAuthorizationCodeObj {
  authorization: AutorizacionDetalle;
  CodigoAutorizacion: string;
  valid: boolean; // DOCS Valida si el codigo es correcto o incorrecto
  status: string; // DOCS estado para controlar los estados del codigo de seguridad dependiendo de la validacion del codigo de seguridad
}
