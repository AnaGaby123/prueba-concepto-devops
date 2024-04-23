import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIWorkArrivalDocumentsList,
  IWorkArrivalDocumentsList,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list.models';
import {workArrivalDocumentsListActions} from '@appActions/pendings/work-arrival-documents';

export const workArrivalDocumentsListReducer: ActionReducer<IWorkArrivalDocumentsList> = createReducer(
  initialIWorkArrivalDocumentsList(),
  on(
    workArrivalDocumentsListActions.SET_SEARCH_TERM,
    (state: IWorkArrivalDocumentsList, {searchTerm}): IWorkArrivalDocumentsList => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    workArrivalDocumentsListActions.FETCH_PROVIDERS_SUCCESS,
    (state: IWorkArrivalDocumentsList, {providers}): IWorkArrivalDocumentsList => ({
      ...state,
      providers,
    }),
  ),
  on(
    workArrivalDocumentsListActions.SET_PROVIDERS_STATUS,
    (state: IWorkArrivalDocumentsList, {providersStatus}): IWorkArrivalDocumentsList => ({
      ...state,
      providersStatus,
    }),
  ),
  on(
    workArrivalDocumentsListActions.SET_SELECTED_BURGER_OPTION,
    (state: IWorkArrivalDocumentsList, {selectedBurgerOption}): IWorkArrivalDocumentsList => ({
      ...state,
      selectedBurgerOption,
    }),
  ),
);
