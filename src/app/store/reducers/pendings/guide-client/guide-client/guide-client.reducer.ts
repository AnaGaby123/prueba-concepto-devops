/* Store Imports */
import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';

import {
  IGuideClient,
  TITLE_GUIDE_CLIENT,
} from '@appModels/store/pendings/guide-client/guide-client/guide-client.models';
import {guideClientListReducer} from '@appReducers/pendings/guide-client/guide-client/guide-client-list/guide-client-list.reducer';

export const guideClientsReducer: ActionReducer<IGuideClient> = combineReducers({
  title: createReducer(TITLE_GUIDE_CLIENT),
  guideClientList: guideClientListReducer,
});
