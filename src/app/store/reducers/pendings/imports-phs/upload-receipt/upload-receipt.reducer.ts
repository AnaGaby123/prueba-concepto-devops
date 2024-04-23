import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {
  IUploadReceipt,
  TITLE_UPLOAD_RECEIPT,
} from '@appModels/store/pendings/imports-phs/upload-receipt/upload-receipt.models';
import {uploadReceiptListReducer} from '@appReducers/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list.reducer';

export const uploadReceiptReducer: ActionReducer<IUploadReceipt> = combineReducers({
  title: createReducer(TITLE_UPLOAD_RECEIPT),
  detailsMode: createReducer(false),
  uploadReceiptList: uploadReceiptListReducer,
});
