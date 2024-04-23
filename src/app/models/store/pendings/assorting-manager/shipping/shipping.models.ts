import {
  initialIShippingDashboard,
  IShippingDashboard,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping-dashboard/shipping-dashboard.models';
import {
  initialIShippingDetails,
  IShippingDetails,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping-details/shipping-details.models';

export const TITLE_SHIPPING = 'TRABAJAR RUTAS · ENVÍO';

export interface IShipping {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  shippingDashboard: IShippingDashboard;
  shippingDetails: IShippingDetails;
}

export const initialIShipping = (): IShipping => ({
  title: TITLE_SHIPPING,
  detailsMode: false,
  allowToDetails: false,
  shippingDashboard: initialIShippingDashboard(),
  shippingDetails: initialIShippingDetails(),
});
