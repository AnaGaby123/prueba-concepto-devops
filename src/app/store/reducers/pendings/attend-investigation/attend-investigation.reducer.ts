import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IAttendInvestigation,
  initialAttendInvestigation,
  titleAttendInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation.model';
import {attendInvestigationListReducer} from '@appReducers/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.reducer';
import {attendInvestigationDetailsReducer} from '@appReducers/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.reducer';
import {attendInvestigationActions} from '@appActions/pendings/attend-investigation';

export const attendInvestigationReducer: ActionReducer<IAttendInvestigation> = combineReducers(
  {
    title: createReducer(titleAttendInvestigation),
    allowToDetails: createReducer(
      initialAttendInvestigation().allowToDetails,
      on(
        attendInvestigationActions.SET_ALLOW_TO_DETAILS,
        (state, {allowToDetails}) => allowToDetails,
      ),
    ),
    detailsMode: createReducer(
      initialAttendInvestigation().detailsMode,
      on(attendInvestigationActions.SET_DETAILS_MODE, (state, {detailsMode}) => detailsMode),
    ),
    attendInvestigationList: attendInvestigationListReducer,
    attendInvestigationDetails: attendInvestigationDetailsReducer,
  },
  {...initialAttendInvestigation()},
);
