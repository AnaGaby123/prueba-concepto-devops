import {
  initialIRegulatoryResearchState,
  IRegulatoryResearchState,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.models';

import {
  initialIPurchasingConfigurationDetailsState,
  IPurchasingConfigurationDetails,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {
  ILogisticConfigurationDetailsState,
  initialLogisticConfigurationDetailsState,
} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';
import {
  initialISalesConfigurationDetailsState,
  ISalesConfigurationDetailsModel,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';

export interface NewProductExistingSupplierState {
  regulatoryResearch: IRegulatoryResearchState;
  purchasingConfiguration: IPurchasingConfigurationDetails;
  salesConfiguration: ISalesConfigurationDetailsModel;
  logisticConfiguration: ILogisticConfigurationDetailsState;
}

export const initialNewProductExistingSupplierState = (): NewProductExistingSupplierState => ({
  regulatoryResearch: initialIRegulatoryResearchState(),
  purchasingConfiguration: initialIPurchasingConfigurationDetailsState(),
  salesConfiguration: initialISalesConfigurationDetailsState(),
  logisticConfiguration: initialLogisticConfigurationDetailsState(),
});
