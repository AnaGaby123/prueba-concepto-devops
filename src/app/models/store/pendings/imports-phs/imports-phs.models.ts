import {
  IDeclareTransitArrival,
  initialIDeclareTransitArrival,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {
  initialIUploadReceipt,
  IUploadReceipt,
} from '@appModels/store/pendings/imports-phs/upload-receipt/upload-receipt.models';
import {
  IControlMaterialDelivery,
  initialIControlMaterialDelivery,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery.models';

export interface IImportsPhsState {
  declareTransitArrival: IDeclareTransitArrival;
  uploadReceipt: IUploadReceipt;
  controlMaterialDelivery: IControlMaterialDelivery;
}

export const initialIImportsPhsState = (): IImportsPhsState => ({
  declareTransitArrival: initialIDeclareTransitArrival(),
  uploadReceipt: initialIUploadReceipt(),
  controlMaterialDelivery: initialIControlMaterialDelivery(),
});
