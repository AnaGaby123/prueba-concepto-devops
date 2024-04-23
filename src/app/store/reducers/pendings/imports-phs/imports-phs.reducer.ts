import {ActionReducer, combineReducers} from '@ngrx/store';
import {IImportsPhsState} from '@appModels/store/pendings/imports-phs/imports-phs.models';
import {declareTransitArrivalReducer} from '@appReducers/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.reducer';
import {uploadReceiptReducer} from '@appReducers/pendings/imports-phs/upload-receipt/upload-receipt.reducer';
import {controlMaterialDeliveryReducer} from '@appReducers/pendings/imports-phs/control-material-delivery/control-material-delivery.reducer';

export const importsPHSReducer: ActionReducer<IImportsPhsState> = combineReducers({
  declareTransitArrival: declareTransitArrivalReducer,
  uploadReceipt: uploadReceiptReducer,
  controlMaterialDelivery: controlMaterialDeliveryReducer,
});
