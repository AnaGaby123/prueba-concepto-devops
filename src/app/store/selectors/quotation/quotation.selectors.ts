/*core imports */
import {createSelector} from '@ngrx/store';

/*model imports */
import {QuotationState} from '@appModels/store/quotation/quotation.models';
import {QuotationDashboardState} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';

/*selector imports */
import {selectQuotationState} from '@appSelectors/pendings/pendings.selectors';
import {initialNewClientFormState} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';

export const selectClientQuotations = createSelector(
  selectQuotationState,
  (state: QuotationState): QuotationDashboardState => state.quotationDashboard,
);
export const selectDetailsMode = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.allowAccessToDetails,
);
export const selectEnableEdit = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.enableEdit,
);
export const selectQuotationDetailsComponent = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.isInDetailsComponent,
);
export const selectTitle = createSelector(
  selectQuotationState,
  (state: QuotationState): string => state.title,
);
export const selectChangeTitle = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.title !== initialNewClientFormState().title,
);
export const selectNavBarRequestQuotation = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.NavBarRequestQuotation,
);
export const selectHiddeBack = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state.hiddeBack,
);
export const selectShowNavBar = createSelector(
  selectQuotationState,
  (state: QuotationState): boolean => state?.NavBarGeneralData,
);
