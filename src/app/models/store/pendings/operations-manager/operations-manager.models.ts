/* Models Imports */
import {
  initialIShippingConsole,
  IShippingConsole,
} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console.models';
import {
  initialIlPriorityConsole,
  IPriorityConsole,
} from '@appModels/store/pendings/operations-manager/priority-console/priority-console.models';

export interface IOperationsManager {
  priorityConsole: IPriorityConsole;
  shippingConsole: IShippingConsole;
}

export const initialIOperationsManager = (): IOperationsManager => ({
  priorityConsole: initialIlPriorityConsole(),
  shippingConsole: initialIShippingConsole(),
});
