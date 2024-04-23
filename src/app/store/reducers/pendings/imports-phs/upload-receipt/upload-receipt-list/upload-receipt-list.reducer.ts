import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIUploadReceiptList,
  IUploadReceiptList,
} from '@appModels/store/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list.models';
import {uploadReceiptListActions} from '@appActions/pendings/imports-phs/upload-receipt';

export const uploadReceiptListReducer: ActionReducer<IUploadReceiptList> = createReducer(
  {...initialIUploadReceiptList()},
  on(uploadReceiptListActions.SET_FILTER_ORDER, (state, {filter}) => ({
    ...state,
    filterByType: filter,
  })),
  on(uploadReceiptListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm},
  })),
);
