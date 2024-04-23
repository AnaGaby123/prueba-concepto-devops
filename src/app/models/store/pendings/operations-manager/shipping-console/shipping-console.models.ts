/* Models Imports */
import {
  initialIShippingConsoleList,
  IShippingConsoleList,
} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console-list/sipping-console-list.models';

export interface IShippingConsole {
  shippingConsoleList: IShippingConsoleList;
}

export const initialIShippingConsole = (): IShippingConsole => ({
  shippingConsoleList: initialIShippingConsoleList(),
});
