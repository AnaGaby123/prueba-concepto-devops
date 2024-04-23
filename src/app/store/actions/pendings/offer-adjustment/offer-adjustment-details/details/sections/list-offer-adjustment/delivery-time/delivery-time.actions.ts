import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'OfferAdjustmentDetailsLisOfferAdjustmentDeliveryTimeApi';
const typeReducer = 'OfferAdjustmentDetailsLisOfferAdjustmentDeliveryTime';

export const SET_TWO_DAYS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Two Days Mode'),
  props<{value: boolean}>(),
);
export const SET_FREIGTH_EXPRESS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Freigth Express Mode'),
  props<{value: boolean}>(),
);
export const WITHOUT_SUBTACTIC = createAction(
  buildingStringActionType(typeReducer, 'Without Subtactic'),
);
