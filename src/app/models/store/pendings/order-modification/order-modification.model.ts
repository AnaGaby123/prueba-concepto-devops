import {
  initialIOrderModificationList,
  IOrderModificationList,
} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {
  initialOrderModificationDetailsState,
  IOrderModificationDetails,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';

export const TITLE_ORDER_MODIFICATION = 'Controlar Pedido en Tránsito';

export interface IOrderModificationState {
  title: string;
  isInDetailsView: boolean;
  allowedToDetails: boolean;
  orderModificationList: IOrderModificationList;
  orderModificationDetails: IOrderModificationDetails;
}

export const initialIOrderModificationState = (): IOrderModificationState => ({
  title: TITLE_ORDER_MODIFICATION,
  isInDetailsView: false,
  allowedToDetails: false,
  orderModificationList: initialIOrderModificationList(),
  orderModificationDetails: initialOrderModificationDetailsState(),
});
