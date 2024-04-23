import {createAction} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Pendings[Reducer]';
const typeApi = 'Pendings[Api]';

// DOCS: ACCIONES PARA INVOKE DE PENDIENTES CON SIGNALR
export const INIT_INVOKE_PENDINGS = createAction(
  buildingStringActionType(typeApi, 'Init invoke pendings'),
);
export const UPDATE_MAILBOX_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update mailbox counter'),
);
export const UPDATE_QUOTER_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update quoter counter'),
);
export const UPDATE_ATTEND_CLOSING_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update attend closing counter'),
);
export const UPDATE_DAILY_MEETING_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update dailty meeting counter'),
);
export const UPDATE_CLOSE_OFFER_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update close offer counter'),
);
export const UPDATE_OFFER_ADJUSTMENT_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update offer adjustment counter'),
);
export const UPDATE_FOLLOW_PURCHASE_PROMISE_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update follow purchase promise counter'),
);
export const UPDATE_PURCHASE_PROMISE_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update purchase promise counter'),
);
export const UPDATE_PRE_PROCESS_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update pre process counter'),
);
export const UPDATE_NOT_PROCESSED_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update not processed counter'),
);
export const UPDATE_GENERAL_SUMMARY_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update general summary counter'),
);
export const UPDATE_VALIDATE_ADJUSTMENT_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update general summary counter'),
);
export const UPDATE_CHECKOUT_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update general summary counter'),
);
export const UPDATE_ATTEND_INVESTIGATION_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update attend investigation counter'),
);
export const UPDATE_REGULATORY_RESEARCH_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update regulatory research counter'),
);
export const UPDATE_PURCHASING_CONFIGURATION_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update purchasing configuration counter'),
);
export const UPDATE_LOGISTIC_CONFIGURATION_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update logistic configuration counter'),
);
export const UPDATE_SALES_CONFIGURATION_COUNTER = createAction(
  buildingStringActionType(typeApi, 'Update sales configuration counter'),
);
