import {createSelector} from '@ngrx/store';
import {IShipping} from '@appModels/store/pendings/assorting-manager/shipping/shipping.models';
import {selectShipping} from '@appSelectors/pendings/assorting-manager/shipping/shipping.selectors';

export const selectShippingDashboard = createSelector(
  selectShipping,
  (state: IShipping) => state.shippingDashboard,
);
