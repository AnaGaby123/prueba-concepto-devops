import {ActionReducer, createReducer} from '@ngrx/store';
import {
  initialIShippingDashboard,
  IShippingDashboard,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping-dashboard/shipping-dashboard.models';

export const shippingDashboardReducer: ActionReducer<IShippingDashboard> = createReducer(
  initialIShippingDashboard(),
);
