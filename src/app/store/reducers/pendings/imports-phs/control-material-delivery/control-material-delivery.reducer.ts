import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IControlMaterialDelivery,
  initialIControlMaterialDelivery,
  TITLE_CONTROL_MATERIAL_DELIVERY,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery.models';
import {controlMaterialDeliveryListReducer} from '@appReducers/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.reducer';
import {controlMaterialDeliveryActions} from '@appActions/pendings/imports-phs/control-material-delivery';
import {controlMaterialDeliveryDetailsReducer} from '@appReducers/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.reducer';

export const controlMaterialDeliveryReducer: ActionReducer<IControlMaterialDelivery> = combineReducers(
  {
    title: createReducer(TITLE_CONTROL_MATERIAL_DELIVERY),
    detailsMode: createReducer(
      initialIControlMaterialDelivery().detailsMode,
      on(controlMaterialDeliveryActions.SET_IS_DETAILS, (state, {isDetails}) => isDetails),
    ),
    controlMaterialDeliveryList: controlMaterialDeliveryListReducer,
    controlMaterialDeliveryDetails: controlMaterialDeliveryDetailsReducer,
  },
);
