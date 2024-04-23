import {createSelector} from '@ngrx/store';
import {selectWorkArrivalDocuments} from '@appSelectors/pendings/pendings.selectors';
import {IWorkArrivalDocuments} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents.models';
import {IWorkArrivalDocumentsList} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectWorkArrivalDocumentsList = createSelector(
  selectWorkArrivalDocuments,
  (state: IWorkArrivalDocuments): IWorkArrivalDocumentsList => state.workArrivalDocumentsList,
);
export const selectSearchTerm = createSelector(
  selectWorkArrivalDocumentsList,
  (state: IWorkArrivalDocumentsList): string => state.searchTerm,
);
export const selectProviders = createSelector(
  selectWorkArrivalDocumentsList,
  (state: IWorkArrivalDocumentsList): Array<any> => state.providers,
);
export const selectProvidersStatus = createSelector(
  selectWorkArrivalDocumentsList,
  (state: IWorkArrivalDocumentsList): number => state.providersStatus,
);
export const selectBurgerOptions = createSelector(
  selectWorkArrivalDocumentsList,
  (state: IWorkArrivalDocumentsList): Array<DropListOption> => state.burgerOptions,
);
export const selectedBurgerOption = createSelector(
  selectWorkArrivalDocumentsList,
  (state: IWorkArrivalDocumentsList): DropListOption => state.selectedBurgerOption,
);
