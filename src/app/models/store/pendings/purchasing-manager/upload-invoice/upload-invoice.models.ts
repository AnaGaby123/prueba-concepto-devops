import {
  initialIUploadInvoiceList,
  IUploadInvoiceList,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {
  initialIUploadInvoiceDetails,
  IUploadInvoiceDetails,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';

export const TITLE_UPLOAD_INVOICE = 'cargar factura';

export interface IUploadInvoice {
  title: string;
  detailsMode: boolean;
  uploadInvoiceList: IUploadInvoiceList;
  uploadInvoiceDetails: IUploadInvoiceDetails;
}

export const initialIUploadInvoice = (): IUploadInvoice => ({
  title: TITLE_UPLOAD_INVOICE,
  detailsMode: false,
  uploadInvoiceList: initialIUploadInvoiceList(),
  uploadInvoiceDetails: initialIUploadInvoiceDetails(),
});
