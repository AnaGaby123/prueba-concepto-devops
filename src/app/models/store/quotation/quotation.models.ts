import {QuotationDashboardState} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {
  initialQuotationDetails,
  QuotationDetailsState,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {initialClientQuotations} from '@appHelpers/pending/quotation/quotation.helpers';

export interface QuotationState {
  quotationDashboard: QuotationDashboardState;
  quotationDetails: QuotationDetailsState;
  allowAccessToDetails: boolean;
  enableEdit: boolean;
  isInDetailsComponent: boolean;
  hiddeBack: boolean;
  title: string;
  NavBarRequestQuotation: boolean;
  NavBarGeneralData: boolean;
}

export const initialQuotationState = (): QuotationState => ({
  quotationDashboard: initialClientQuotations(),
  quotationDetails: initialQuotationDetails(),
  allowAccessToDetails: false,
  enableEdit: false,
  NavBarRequestQuotation: true,
  isInDetailsComponent: false,
  hiddeBack: false,
  title: TITLE_QUOTATION,
  NavBarGeneralData: true,
});

export const TITLE_QUOTATION = 'COTIZAR LO COTIZABLE';
