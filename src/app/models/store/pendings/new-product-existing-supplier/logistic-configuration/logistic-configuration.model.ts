import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Resumen} from 'api-logistica';
import {SortOptionsFiltersPqf} from '@appModels/store/utils/utils.model';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ConfProveedorLogistica,
} from 'api-catalogos';

export interface ILogisticConfigurationDetailsState {
  searchTerm: string;
  filters: Array<FilterOptionPqf>;
  familiesList: Array<IFamilyLogisticConfiguration>;
  selectedFamily: IFamilyLogisticConfiguration;

  preSelectedFamily: IFamilyLogisticConfiguration;
  isActivePopUp: boolean;
  apiStatusDashboard: number;
  apiStatusDetails: number;
}

export interface IFamilyLogisticConfiguration extends Resumen {
  Index?: number;
  IdCotPartidaCotizacionInvestigacion?: string;
  IdMarca?: string;
  NombreMarca?: string;
  NombreImagenMarca?: string;
  IdFamilia?: string;
  IdProveedor?: string;
  NombreProveedor?: string;
  IdMarcaFamiliaProveedor?: string;
  CatTipoProductoNombre?: string;
  CatSubTipoProductoNombre?: string;
  CatControlNombre?: string;
  FechaCreacionPendiente?: string;
  IdActual?: string;
  IdAnterior?: string;
  Mexicano?: boolean;
  detailsGeneralConfiguration?: ConfProveedorLogistica;
  detailsConfiguration?: Array<IOfferDeliveryRoutes>;
  detailConfigurationBackup?: Array<IOfferDeliveryRoutes>;
  isSelected?: boolean;
  fullFamilyName?: string;
  imageHover?: string;
  needsToReloadInfo?: boolean;
}

export interface totalsDaysTimeLogistic {
  timeLogistics: number;
  timeCommerce: number;
}

export interface IOfferDeliveryRoutes
  extends ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj {
  isSelected?: boolean;
}

export const initialFiltersLogisticConfigurationDetails = (): Array<FilterOptionPqf> => [
  {
    id: '1',
    text: SortOptionsFiltersPqf.newer,
    isActive: true,
    enable: true,
  },
  {
    id: '2',
    text: SortOptionsFiltersPqf.older,
    isActive: false,
    enable: true,
  },
];

export const initialLogisticConfigurationDetailsState = (): ILogisticConfigurationDetailsState => ({
  searchTerm: '',
  filters: initialFiltersLogisticConfigurationDetails(),
  familiesList: [] as Array<IFamilyLogisticConfiguration>,
  selectedFamily: {},
  preSelectedFamily: {},
  isActivePopUp: false,
  apiStatusDashboard: API_REQUEST_STATUS_DEFAULT,
  apiStatusDetails: API_REQUEST_STATUS_DEFAULT,
});
