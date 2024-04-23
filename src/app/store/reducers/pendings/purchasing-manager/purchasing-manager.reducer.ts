import {ActionReducer, combineReducers} from '@ngrx/store';
import {
  initialIPurchasingManagerState,
  IPurchasingManagerState,
} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {processPurchaseReducer} from '@appReducers/pendings/purchasing-manager/process-purchase/process-purchase.reducer';
import {uploadInvoiceReducer} from '@appReducers/pendings/purchasing-manager/upload-invoice/upload-invoice.reducer';
import {registerConfirmationReducer} from '@appReducers/pendings/purchasing-manager/register-confirmation/register-confirmation.reducer';
import {checkOcNotArrivedReducer} from '@appReducers/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.reducer';
import {manageBackOrderReducer} from '@appReducers/pendings/purchasing-manager/manage-back-order/manage-back-order.reducer';
import {declareArrivalReducer} from '@appReducers/pendings/purchasing-manager/declare-arrival/declare-arrival.reducer';
import {registerArrivalReducer} from '@appReducers/pendings/purchasing-manager/register-arrival/register-arrival.reducer';
import {confirmDispatchReducer} from '@appReducers/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.reducer';
import {dispatchMonitoringReducer} from '@appReducers/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.reducer';
import {plancCollectionReducer} from '@appReducers/pendings/purchasing-manager/plan-collection/plan-collection.reducer';

export const purchasingManageReducer: ActionReducer<IPurchasingManagerState> = combineReducers(
  {
    processPurchase: processPurchaseReducer,
    uploadInvoice: uploadInvoiceReducer,
    registerConfirmation: registerConfirmationReducer,
    confirmDispatch: confirmDispatchReducer,
    checkOcNotArrived: checkOcNotArrivedReducer,
    manageBackOrder: manageBackOrderReducer,
    declareArrival: declareArrivalReducer,
    registerArrival: registerArrivalReducer,
    dispatchMonitoring: dispatchMonitoringReducer,
    planCollection: plancCollectionReducer,
  },
  {...initialIPurchasingManagerState()},
);
