import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {ProviderListItemForRegulatoryResearch} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {ProductoRatificacionObj} from 'api-logistica';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {VMarcaFamilia, VProductoDetalle, VProductoSuplementario} from 'api-catalogos';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {ISupplements} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

export interface IRegulatoryResearchDetailsState {
  filterOptions: Array<FilterOptionPqf>;
  productList: ProductRatificationExtendedList;
  productListApiStatus: number;
  selectedProduct?: ProductRatificationExtended;
  searchTerm: string;
  selectedProvider?: ProviderListItemForRegulatoryResearch;
  tabOptions: Array<IPqfTabOption>;
}

export interface ProductRatificationExtended extends ProductoRatificacionObj {
  index?: number;
  isSelected: boolean;
  needsToReloadInfo: boolean;
  productDetails: VProductoDetalle;
  productDetailsBackUp: VProductoDetalle;
  technicalSection: TechnicalSection;
  regulatorySection: any;
  IdcotPartidaInvestigacion: string;
  casValid: boolean;
  imagePresentation: string;
  brandImage: string;
}

export interface TechnicalSection {
  classificationList?: DropListOptionPqf[];
  selectedClasificationInformativa?: DropListOptionPqf;
  familiesList?: DropListOptionPqf[];
  familyBrandList?: Array<VMarcaFamilia>;
  selectedFamily?: DropListOptionPqf;
  groupCharacteristic?: DropListOptionPqf[];
  ArchivoEstructuraMolecular?: File;
  supplement?: ISupplements;
  supplementaryProducts?: Array<VProductoSuplementario>;
  supplementaryProductsToDelete?: Array<VProductoSuplementario>;
}

export type ProductRatificationExtendedList = Array<ProductRatificationExtended>;
export const initialIRegulatoryResearchDetails = (): IRegulatoryResearchDetailsState => ({
  filterOptions: [
    {
      id: '1',
      enable: true,
      isActive: false,
      text: 'filters.newer',
    },
    {
      id: '2',
      enable: true,
      isActive: false,
      text: 'filters.older',
    },
  ],
  productList: [],
  productListApiStatus: ApiRequestStatus.Default,
  tabOptions: [
    {
      id: '1',
      enable: true,
      selected: true,
      label: 'newProductExistingSupplier.regulatoryResearch.details.commercialTechnicalResearch',
    },
    {
      id: '2',
      enable: true,
      selected: false,
      label:
        'newProductExistingSupplier.regulatoryResearch.details.regulationAndNonTariffRestrictions',
    },
  ],
  searchTerm: '',
});
