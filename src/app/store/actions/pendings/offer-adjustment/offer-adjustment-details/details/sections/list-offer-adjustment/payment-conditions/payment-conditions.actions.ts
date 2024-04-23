import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IJustificationAndObservations} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {AjOfCondicionesdePagoCotizacion} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'OfferAdjustmentDetailsLisOfferAdjustmentPaymentConditionsApi';
const typeReducer = 'OfferAdjustmentDetailsLisOfferAdjustmentPaymentConditions';

export const SET_TACTICS_AND_SUBTACTICS = createAction(
  buildingStringActionType(typeReducer, 'Set Option Bar Activity'),
  props<{
    increaseConditionsTime: IJustificationAndObservations;
    payWithAmericanExpress: IJustificationAndObservations;
  }>(),
);
export const SET_PAYMENT_CONDITIONS_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Payment Conditions Selected Selected'),
  props<{
    paymentConditionsSelected: DropListOption;
    idClient: string;
    idQuotation: string;
    additionalDays: number;
  }>(),
);
export const FETCH_PAYMENT_CONDITIONS_CONF_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Conf Payment Conditions Success'),
  props<{
    confPaymentConditions: AjOfCondicionesdePagoCotizacion;
    idClient: string;
    idQuotation: string;
  }>(),
);
export const SET_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Set Comments'),
  props<{comments: string; idClient: string; idQuotation: string}>(),
);
export const SET_DAYS = createAction(
  buildingStringActionType(typeReducer, 'Set Days'),
  props<{
    days: number;
    idClient: string;
    idQuotation: string;
    paymentConditionsSelected: DropListOption;
  }>(),
);
