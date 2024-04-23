import {ActionReducer, combineReducers} from '@ngrx/store';
import {
  initialIResourceManagerState,
  IResourceManagerState,
} from '@appModels/store/pendings/resource-manager/resource-manager.models';
import {quarantineManagerReducer} from '@appReducers/pendings/resource-manager/quarantine-manager/quarantine-manager.reducer';

export const resourceManagerReducer: ActionReducer<IResourceManagerState> = combineReducers(
  {
    quarantineManager: quarantineManagerReducer,
  },
  {...initialIResourceManagerState()},
);
