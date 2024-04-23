import {IMaterialReceiver} from '@appModels/store/pendings/material receiver/material receiver.models';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {declareArrivalGuideReducer} from '@appReducers/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide.reducer';

export const materialReceiverReducer: ActionReducer<IMaterialReceiver> = combineReducers({
  declareArrivalGuide: declareArrivalGuideReducer,
});
