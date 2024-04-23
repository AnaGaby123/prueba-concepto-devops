/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IChartInfo,
  IProvider,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Register-Confirmation-List';
const typeApi = 'Register-Confirmation-List-Api';

export const CLEAN_REGISTER_CONFIRMATION_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean Register Confirmation'),
);
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{sort: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_TYPE_OF_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Type of Search'),
  props<{typeOfSearch: DropListOption}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Failed'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Success'),
  props<{providers: Array<IProvider>; totalProviders: number}>(),
);
export const FETCH_CHARTS_DONUT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Donut Load'),
);
export const FETCH_CHARTS_DONUT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Donut Success'),
  props<{
    donutProviders: IChartInfo;
    donutFreight: IChartInfo;
    donutDelivery: IChartInfo;
  }>(),
);
export const FETCH_CHARTS_DONUT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Donut Failed'),
  props<{
    donutProviders: IChartInfo;
    donutFreight: IChartInfo;
    donutDelivery: IChartInfo;
  }>(),
);
export const FETCH_CHARTS_BAR_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Bar Load'),
);
export const FETCH_CHARTS_BAR_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Bar Success'),
  props<{
    barTime: IChartInfo;
    barDelivery: IChartInfo;
  }>(),
);
export const FETCH_CHARTS_BAR_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Charts Bar Failed'),
);
