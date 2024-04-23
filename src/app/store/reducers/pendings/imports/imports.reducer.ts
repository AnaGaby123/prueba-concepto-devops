/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Imports */
import {
  IImportsState,
  initialIImportsState,
} from '@appModels/store/pendings/imports/imports.models';

/* Reducers Imports */
import {planDispatchReducer} from '@appReducers/pendings/imports/plan-dispatch/plan-dispatch.reducer';
import {loadMissingReducer} from '@appReducers/pendings/imports/load-missing/load-missing.reducer';
import {registerDispatchReducer} from '@appReducers/pendings/imports/register-dispatch/register-dispatch.reducer';

export const importsReducer: ActionReducer<IImportsState> = combineReducers(
  {
    planDispatch: planDispatchReducer,
    loadMissing: loadMissingReducer,
    registerDispatch: registerDispatchReducer,
  },
  {...initialIImportsState()},
);
