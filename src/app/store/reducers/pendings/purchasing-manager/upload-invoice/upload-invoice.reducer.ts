import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialIUploadInvoice,
  IUploadInvoice,
  TITLE_UPLOAD_INVOICE,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice.models';
import {uploadInvoiceListReducer} from '@appReducers/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.reducer';
import {uploadInvoiceDetailsReducer} from '@appReducers/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.reducer';
/*ctions Imports*/
import {uploadInvoiceActions} from '@appActions/pendings/purchasing-manager/upload-invoice';

export const uploadInvoiceReducer: ActionReducer<IUploadInvoice> = combineReducers(
  {
    title: createReducer(TITLE_UPLOAD_INVOICE),
    detailsMode: createReducer(
      initialIUploadInvoice().detailsMode,
      on(
        uploadInvoiceActions.SET_DETAILS_COMPONENT,
        (state, {detailsComponent}) => detailsComponent,
      ),
    ),
    uploadInvoiceList: uploadInvoiceListReducer,
    uploadInvoiceDetails: uploadInvoiceDetailsReducer,
  },
  {...initialIUploadInvoice()},
);
