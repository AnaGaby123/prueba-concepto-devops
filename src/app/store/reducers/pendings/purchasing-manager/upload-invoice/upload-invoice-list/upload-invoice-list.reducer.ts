import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIUploadInvoiceList,
  IUploadInvoiceList,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
/*Actions Import*/
import {uploadInvoiceListActions} from '@appActions/pendings/purchasing-manager/upload-invoice';

const initialUploadInvoiceList: IUploadInvoiceList = {
  ...initialIUploadInvoiceList(),
};
export const uploadInvoiceListReducer: ActionReducer<IUploadInvoiceList> = createReducer(
  initialUploadInvoiceList,
  on(uploadInvoiceListActions.SET_SORT_SELECTED, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(uploadInvoiceListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(uploadInvoiceListActions.FETCH_PROVIDER_SUCCESS, (state, {data}) => ({
    ...state,
    providers: {
      ...state.providers,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.providers.Results, ...data.Results],
    },
  })),
  on(uploadInvoiceListActions.FETCH_PROVIDER_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(uploadInvoiceListActions.FETCH_DONUT_CHART_SUCCESS, (state, {data}) => ({
    ...state,
    donutChart: data,
  })),
  on(uploadInvoiceListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      requestStatus: status,
    },
  })),
);
