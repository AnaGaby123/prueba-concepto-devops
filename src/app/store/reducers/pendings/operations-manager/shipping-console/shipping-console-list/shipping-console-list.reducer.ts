/* Core Imports */
import {ActionReducer, createReducer} from '@ngrx/store';

/* Models Imports */
import {
  initialIShippingConsoleList,
  IShippingConsoleList,
} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console-list/sipping-console-list.models';

export const shippingConsoleListReducer: ActionReducer<IShippingConsoleList> = createReducer(
  initialIShippingConsoleList(),
);
