/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectShippingConsoleList} from '@appSelectors/pendings/operations-manager/shipping-console/shipping-console.selectors';

/* Models Imports */
import {IShippingConsoleList} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console-list/sipping-console-list.models';

export const selectSearchTerm = createSelector(
  selectShippingConsoleList,
  (state: IShippingConsoleList) => state.searchTerm,
);
