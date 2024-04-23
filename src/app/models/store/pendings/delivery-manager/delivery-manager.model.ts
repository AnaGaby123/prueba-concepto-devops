import {
  IAssignMessenger,
  initialIAssignMessenger,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger.model';

export interface IDeliveryManager {
  assignMessenger: IAssignMessenger;
}

export const initialIDeliveryManagerState = (): IDeliveryManager => ({
  assignMessenger: initialIAssignMessenger(),
});
