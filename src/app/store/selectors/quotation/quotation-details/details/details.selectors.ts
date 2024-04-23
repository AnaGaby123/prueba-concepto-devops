/*core imports */
import {createSelector} from '@ngrx/store';

/*model imports */
import {QuotationDetailsState} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {IDetails} from '@appModels/store/quotation/quotation-details/details/details.models';

/*selector imports */
import {INewClientForm} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';
import {selectQuotationDetails} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

export const selectDetails = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): IDetails => state.details,
);

export const selectNewCustomerSection = createSelector(
  selectQuotationDetails,
  (state: QuotationDetailsState): INewClientForm => state.newCustomerSection,
);
