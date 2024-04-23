/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectBalanceInFavorList} from '@appSelectors/pendings/load-balance-in-favor/load-balance-in-favor.selectors';

/* Models Imports */
import {ILoadBalanceInFavorList} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.models';

export const selectSearchTerm = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.searchTerm,
);
export const selectTabs = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.tabs,
);
export const selectTabSelected = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.tabSelected,
);
export const selectOptions = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.options,
);
export const selectOptionSelected = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.optionSelected,
);
export const selectProviders = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.providers,
);
export const selectProviderSelected = createSelector(
  selectBalanceInFavorList,
  (state: ILoadBalanceInFavorList) => state.providerSelected,
);
