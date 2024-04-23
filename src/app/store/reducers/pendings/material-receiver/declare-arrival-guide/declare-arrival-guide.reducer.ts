import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IDeclareArrivalGuide,
  initialIDeclareArrivalGuide,
} from '@appModels/store/pendings/material receiver/declare-arrival-guide/declare-arrival-guide.models';

export const declareArrivalGuideReducer: ActionReducer<IDeclareArrivalGuide> = createReducer({
  ...initialIDeclareArrivalGuide(),
});
