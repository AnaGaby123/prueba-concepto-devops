import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IManageBackOrder,
  initialIManageBackOrder,
  TITLE_MANAGE_BACK_ORDER,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order.models';
import {manageBackOrderListReducer} from '@appReducers/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.reducer';
/*Actions Imports*/
import {manageBackOrderActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {manageBackOrderDetailsReducer} from '@appReducers/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.reducer';

export const manageBackOrderReducer: ActionReducer<IManageBackOrder> = combineReducers(
  {
    title: createReducer(TITLE_MANAGE_BACK_ORDER),
    detailsMode: createReducer(
      initialIManageBackOrder().detailsMode,
      on(manageBackOrderActions.SET_IS_DETAILS, (state, {isDetails}) => isDetails),
    ),
    backOrderList: manageBackOrderListReducer,
    backOrderDetails: manageBackOrderDetailsReducer,
  },
  {...initialIManageBackOrder()},
);
