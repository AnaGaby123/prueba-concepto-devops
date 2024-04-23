import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Resumen} from 'api-logistica';
import {
  ConceptoAgenteAduanal,
  ConfProveedorCompra,
  MarcaFamiliaProveedorConsolidacion,
  VMarcaFamilia,
} from 'api-catalogos';
import {IImageItem} from '@appModels/shared/shared.models';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IPurchasingConfigurationDetails {
  customsAgentsConceptList: Array<ConceptoAgenteAduanal>;
  filters: Array<FilterOptionPqf>;
  isActivePop: boolean;
  listFamilies: Array<IFamily>;
  listFamiliesStatus: number;
  detailsFamilyStatus: number;
  searchTerm: string;
  selectedFamily: IFamily;
  preSelectedFamily: IFamily;
  title: string;
}

export const initialIPurchasingConfigurationDetailsState = (): IPurchasingConfigurationDetails => ({
  customsAgentsConceptList: [],
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
  isActivePop: false,
  listFamilies: [],
  listFamiliesStatus: API_REQUEST_STATUS_DEFAULT,
  detailsFamilyStatus: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
  selectedFamily: {},
  preSelectedFamily: {},
  title: 'Configurar familia - Determinar costo de venta',
});

export interface IFamily extends Resumen, IImageItem {
  AreaCorporativo?: string;
  CatControlNombre?: string;
  CatSubTipoProductoNombre?: string;
  CatTipoProductoNombre?: string;
  FechaCreacionPendiente?: Date;
  IdActual?: string;
  IdAnterior?: string;
  IdCotPartidaCotizacionInvestigacion?: string;
  IdFamilia?: string;
  IdMarca?: string;
  IdMarcaFamiliaProveedor?: string;
  Index?: number;
  Mexicano?: boolean;
  NombreImagen?: string;
  NombreMarca?: string;
  NombreProveedor?: string;
  configuration?: IConfProveedorCompra;
  configurationBackUp?: IConfProveedorCompra;
  isSelected?: boolean;
  needsToReload?: boolean;
}

export interface IVMarcaFamilia extends VMarcaFamilia {
  isSelected?: boolean;
}

export interface ITrademarkFamilyProviderConsolidation extends MarcaFamiliaProveedorConsolidacion {
  isOriginal?: boolean;
  isChecked?: boolean;
}

export interface IConfProveedorCompra extends ConfProveedorCompra {
  selectedCustoms?: DropListOptionPqf;
  selectedCustomsAgent?: DropListOptionPqf;
  selectedCustomsAgentConcept?: DropListOptionPqf;
  trademarkFamiliesList?: Array<IVMarcaFamilia>;
  trademarkFamilyProviderConsolidation?: Array<ITrademarkFamilyProviderConsolidation>;
  trademarkFamilyProviderConsolidationToDelete?: Array<ITrademarkFamilyProviderConsolidation>;
}
