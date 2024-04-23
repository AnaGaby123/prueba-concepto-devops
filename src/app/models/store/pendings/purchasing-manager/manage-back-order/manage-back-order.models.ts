import {
  IManageBackOrderList,
  initialIManageBackOrderList,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
import {
  IManageBackOrderDetails,
  initialIManageBackOrderDetails,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';

export const TITLE_MANAGE_BACK_ORDER = 'Gestionar Back Order';

export interface IManageBackOrder {
  title: string;
  detailsMode: boolean;
  backOrderList: IManageBackOrderList;
  backOrderDetails: IManageBackOrderDetails;
}

export const initialIManageBackOrder = (): IManageBackOrder => ({
  title: TITLE_MANAGE_BACK_ORDER,
  detailsMode: false,
  backOrderList: initialIManageBackOrderList(),
  backOrderDetails: initialIManageBackOrderDetails(),
});
