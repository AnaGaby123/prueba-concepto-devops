/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectShippingConsole} from '@appSelectors/pendings/operations-manager/operations-manager.selectors';

/* Models Imports */
import {IShippingConsole} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console.models';

export const selectShippingConsoleList = createSelector(
  selectShippingConsole,
  (state: IShippingConsole) => state.shippingConsoleList,
);
