import {createSelector} from '@ngrx/store';
import {selectWorkArrivalDocuments} from '@appSelectors/pendings/pendings.selectors';
import {IWorkArrivalDocuments} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents.models';

export const selectTitle = createSelector(
  selectWorkArrivalDocuments,
  (state: IWorkArrivalDocuments): string => state.title,
);
export const selectIsDetails = createSelector(
  selectWorkArrivalDocuments,
  (state: IWorkArrivalDocuments): boolean => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectWorkArrivalDocuments,
  (state: IWorkArrivalDocuments): boolean => state.allowToDetails,
);
