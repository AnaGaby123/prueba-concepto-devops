import {
  initialIRegulatoryResearchDashboard,
  IRegulatoryResearchDashboard,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {
  initialIRegulatoryResearchDetails,
  IRegulatoryResearchDetailsState,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';

export interface IRegulatoryResearchState {
  title: string;
  allowToDetails: boolean;
  isInDetails: boolean;
  enableEdit: boolean;
  regulatoryResearchDashboard: IRegulatoryResearchDashboard;
  regulatoryResearchDetails: IRegulatoryResearchDetailsState;
}

export const initialIRegulatoryResearchState = (): IRegulatoryResearchState => ({
  title: 'newProductExistingSupplier.regulatoryResearch.title',
  allowToDetails: false,
  isInDetails: false,
  enableEdit: false,
  regulatoryResearchDashboard: initialIRegulatoryResearchDashboard(),
  regulatoryResearchDetails: initialIRegulatoryResearchDetails(),
});
