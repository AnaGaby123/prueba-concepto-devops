/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';
import {initialIStorerState, IStorerState} from '@appModels/store/pendings/storer/storer.models';
import {inspectorReducer} from '@appReducers/pendings/storer/inspector/inspector.reducer';

export const storerReducer: ActionReducer<IStorerState> = combineReducers(
  {
    inspector: inspectorReducer,
  },
  {...initialIStorerState()},
);
