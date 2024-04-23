import {
  initialIUploadReceiptList,
  IUploadReceiptList,
} from '@appModels/store/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list.models';

export const TITLE_UPLOAD_RECEIPT = 'Cargar Acuse de Recibo';

export interface IUploadReceipt {
  title: string;
  detailsMode: boolean;
  uploadReceiptList: IUploadReceiptList;
  // uploadReceiptDetails: IUploadReceiptDetails;
}

export const initialIUploadReceipt = (): IUploadReceipt => ({
  title: TITLE_UPLOAD_RECEIPT,
  detailsMode: false,
  uploadReceiptList: initialIUploadReceiptList(),
  // uploadReceiptDetails: initialIUploadReceiptDetails(),
});
