/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectBalanceInFavorDetails} from '@appSelectors/pendings/load-balance-in-favor/load-balance-in-favor.selectors';

/* Models Imports */
import {ILoadBalanceInFavorDetails} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.models';

export const selectCompanies = createSelector(
  selectBalanceInFavorDetails,
  (state: ILoadBalanceInFavorDetails) => state.companies,
);
export const selectCompanySelected = createSelector(
  selectBalanceInFavorDetails,
  (state: ILoadBalanceInFavorDetails) => state.companySelected,
);
