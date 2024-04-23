import {ActionReducer, combineReducers} from '@ngrx/store';
import {
  IDeliveryManager,
  initialIDeliveryManagerState,
} from '@appModels/store/pendings/delivery-manager/delivery-manager.model';
import {assignMessengerReducer} from '@appReducers/pendings/deliveryManager/assign-messenger/assign-messenger.reducer';

export const deliveryManagerReducer: ActionReducer<IDeliveryManager> = combineReducers(
  {
    assignMessenger: assignMessengerReducer,
  },
  {...initialIDeliveryManagerState()},
);
