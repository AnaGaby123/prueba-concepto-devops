import {selectAssortingManager} from '@appSelectors/pendings/pendings.selectors';
import {createSelector} from '@ngrx/store';
import {IAssortingManager} from '@appModels/store/pendings/assorting-manager/assorting-manager.models';
import {IShipping} from '@appModels/store/pendings/assorting-manager/shipping/shipping.models';

export const selectShipping = createSelector(
  selectAssortingManager,
  (state: IAssortingManager) => state.shipping,
);
export const selectTitle = createSelector(selectShipping, (state: IShipping) => state.title);
export const selectIsDetails = createSelector(
  selectShipping,
  (state: IShipping) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectShipping,
  (state: IShipping) => state.allowToDetails,
);
