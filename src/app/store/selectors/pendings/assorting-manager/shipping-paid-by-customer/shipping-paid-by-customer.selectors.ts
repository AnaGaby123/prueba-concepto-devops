import {selectAssortingManager} from '@appSelectors/pendings/pendings.selectors';
import {createSelector} from '@ngrx/store';
import {IAssortingManager} from '@appModels/store/pendings/assorting-manager/assorting-manager.models';
import {IShippingPaidByCustomer} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.models';

export const selectShippingPaidByCustomer = createSelector(
  selectAssortingManager,
  (state: IAssortingManager): IShippingPaidByCustomer => state.shippingPaidByCustomer,
);
export const selectTitle = createSelector(
  selectShippingPaidByCustomer,
  (state: IShippingPaidByCustomer): string => state.title,
);
export const selectIsDetails = createSelector(
  selectShippingPaidByCustomer,
  (state: IShippingPaidByCustomer): boolean => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectShippingPaidByCustomer,
  (state: IShippingPaidByCustomer): boolean => state.allowToDetails,
);
