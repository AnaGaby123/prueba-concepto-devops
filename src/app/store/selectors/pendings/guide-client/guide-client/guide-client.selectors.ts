/* Store Imports */
import {createSelector} from '@ngrx/store';
import {selectGuideClientState} from '@appSelectors/pendings/pendings.selectors';
import {IGuideClientState} from '@appModels/store/pendings/guide-client/guide-client.models';
import {IGuideClient} from '@appModels/store/pendings/guide-client/guide-client/guide-client.models';

export const selectGuideClient = createSelector(
  selectGuideClientState,
  (state: IGuideClientState) => state.guideClient,
);
export const selectTitle = createSelector(selectGuideClient, (state: IGuideClient) => state.title);
export const selectGuideClientList = createSelector(
  selectGuideClient,
  (state: IGuideClient) => state.guideClientList,
);
