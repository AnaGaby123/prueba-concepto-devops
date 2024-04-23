import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

export const selectUploadInvoice = createSelector(
  selectPurchasingManager,
  (state) => state.uploadInvoice,
);
export const selectTitle = createSelector(selectUploadInvoice, (state) => state.title);
export const selectIsDetails = createSelector(selectUploadInvoice, (state) => state.detailsMode);
export const selectUploadInvoiceList = createSelector(
  selectUploadInvoice,
  (state) => state.uploadInvoiceList,
);
export const selectUploadInvoiceDetail = createSelector(
  selectUploadInvoice,
  (state) => state.uploadInvoiceDetails,
);
