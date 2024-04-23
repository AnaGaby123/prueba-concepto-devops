import {createSelector} from '@ngrx/store';
import {selectImportsPhs} from '@appSelectors/pendings/pendings.selectors';

export const selectUploadReceipt = createSelector(selectImportsPhs, (state) => state.uploadReceipt);
export const selectTitle = createSelector(selectUploadReceipt, (state) => state.title);
export const selectIsDetails = createSelector(selectUploadReceipt, (state) => state.detailsMode);
