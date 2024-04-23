import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialIWorkArrivalDocuments,
  IWorkArrivalDocuments,
  TITLE_WORK_ARRIVAL_DOCUMENTS,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents.models';
import {workArrivalDocumentsListReducer} from '@appReducers/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list.reducer';
import {workArrivalDocumentsDetailsReducer} from '@appReducers/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details.reducer';
import {workArrivalDocumentsActions} from '@appActions/pendings/work-arrival-documents';

export const workArrivalDocumentsReducer: ActionReducer<IWorkArrivalDocuments> = combineReducers({
  title: createReducer(TITLE_WORK_ARRIVAL_DOCUMENTS),
  detailsMode: createReducer(
    initialIWorkArrivalDocuments().detailsMode,
    on(
      workArrivalDocumentsActions.SET_IS_IN_DETAILS_VIEW,
      (state, {detailsMode}): boolean => detailsMode,
    ),
  ),
  allowToDetails: createReducer(
    initialIWorkArrivalDocuments().allowToDetails,
    on(
      workArrivalDocumentsActions.SET_ALLOWED_TO_DETAILS,
      (state, {allowToDetails}): boolean => allowToDetails,
    ),
  ),
  workArrivalDocumentsList: workArrivalDocumentsListReducer,
  workArrivalDocumentsDetails: workArrivalDocumentsDetailsReducer,
});
