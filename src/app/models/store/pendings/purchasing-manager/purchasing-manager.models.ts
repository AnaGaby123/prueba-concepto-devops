import {
  initialIProcessPurchase,
  IProcessPurchase,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase.models';
import {
  initialIUploadInvoice,
  IUploadInvoice,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice.models';
import {
  initialIRegisterConfirmation,
  IRegisterConfirmation,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation.models';
import {
  ICheckOcNotArrived,
  initialICheckOcNotArrived,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.models';
import {
  IManageBackOrder,
  initialIManageBackOrder,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order.models';
import {
  IDeclareArrival,
  initialIDeclareArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival.models';
import {
  initialIRegisterArrival,
  IRegisterArrival,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival.models';
import {
  IConfirmDispatch,
  initialIConfirmDispatch,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.models';
import {
  IDispatchMonitoring,
  initialDispatchMonitoring,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.models';
import {
  initialPlanCollection,
  IPlanCollection,
} from '@appModels/store/pendings/purchasing-manager/plan-collection/plan-collection.models';

export interface IPurchasingManagerState {
  processPurchase: IProcessPurchase;
  uploadInvoice: IUploadInvoice;
  registerConfirmation: IRegisterConfirmation;
  confirmDispatch: IConfirmDispatch;
  checkOcNotArrived: ICheckOcNotArrived;
  manageBackOrder: IManageBackOrder;
  declareArrival: IDeclareArrival;
  registerArrival: IRegisterArrival;
  dispatchMonitoring: IDispatchMonitoring;
  planCollection: IPlanCollection;
}

export const initialIPurchasingManagerState = (): IPurchasingManagerState => ({
  processPurchase: initialIProcessPurchase(),
  uploadInvoice: initialIUploadInvoice(),
  registerConfirmation: initialIRegisterConfirmation(),
  confirmDispatch: initialIConfirmDispatch(),
  checkOcNotArrived: initialICheckOcNotArrived(),
  manageBackOrder: initialIManageBackOrder(),
  declareArrival: initialIDeclareArrival(),
  registerArrival: initialIRegisterArrival(),
  dispatchMonitoring: initialDispatchMonitoring(),
  planCollection: initialPlanCollection(),
});
