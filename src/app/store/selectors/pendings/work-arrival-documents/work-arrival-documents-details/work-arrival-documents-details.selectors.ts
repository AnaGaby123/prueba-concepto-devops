import {createSelector} from '@ngrx/store';
import {selectWorkArrivalDocuments} from '@appSelectors/pendings/pendings.selectors';
import {IWorkArrivalDocuments} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents.models';
import {IWorkArrivalDocumentsDetails} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details.models';

export const selectWorkArrivalDocumentsDetails = createSelector(
  selectWorkArrivalDocuments,
  (state: IWorkArrivalDocuments): IWorkArrivalDocumentsDetails => state.workArrivalDocumentsDetails,
);
export const selectedProvider = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): any => state.selectedProvider,
);
export const selectSearchTerm = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): string => state.searchTerm,
);
export const selectProducts = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): Array<any> => state.products,
);
export const selectProductsStatus = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): number => state.productsStatus,
);
export const selectedProduct = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): any => state.selectedProduct,
);
export const selectContact = createSelector(
  selectWorkArrivalDocumentsDetails,
  (state: IWorkArrivalDocumentsDetails): any => state.contact,
);
