import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialIQuarantineManager,
  IQuarantineManager,
  TITLE_QUARANTINE_MANAGER,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager.models';

import {quarantineManagerListReducer} from '@appReducers/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.reducer';
import {quarantineManagerDetailsReducer} from '@appReducers/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.reducer';
import {quarantineManagerActions} from '@appActions/pendings/resource-manager/quarantine-manager';

export const quarantineManagerReducer: ActionReducer<IQuarantineManager> = combineReducers({
  title: createReducer(TITLE_QUARANTINE_MANAGER),
  detailsMode: createReducer(
    initialIQuarantineManager().detailsMode,
    on(quarantineManagerActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIQuarantineManager().allowToDetails,
    on(
      quarantineManagerActions.SET_ALLOWED_TO_DETAILS,
      (state, {allowToDetails}) => allowToDetails,
    ),
  ),
  quarantineManagerList: quarantineManagerListReducer,
  quarantineManagerDetails: quarantineManagerDetailsReducer,
});
