import {createSelector} from '@ngrx/store';
import {selectUploadReceipt} from '@appSelectors/pendings/imports-phs/upload-receipt/upload-receipt.selectors';

export const selectUploadReceiptList = createSelector(
  selectUploadReceipt,
  (state) => state.uploadReceiptList,
);
export const selectOptionsOrder = createSelector(
  selectUploadReceiptList,
  (state) => state.dataByType,
);
export const selectOrderList = createSelector(
  selectUploadReceiptList,
  (state) => state.filterByType,
);
