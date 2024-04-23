/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';
import {IGuideClientState} from '@appModels/store/pendings/guide-client/guide-client.models';

import {guideClientsReducer} from '@appReducers/pendings/guide-client/guide-client/guide-client.reducer';

export const guideClientReducer: ActionReducer<IGuideClientState> = combineReducers({
  guideClient: guideClientsReducer,
});
