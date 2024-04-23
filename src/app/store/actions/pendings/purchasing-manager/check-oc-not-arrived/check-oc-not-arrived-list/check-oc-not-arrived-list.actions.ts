/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IChartInfo,
  IProvider,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Check-OC-Not-Arrived-List';
const typeApi = 'Check-OC-Not-Arrived-List-Api';

export const CLEAN_CHECK_OC_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean Check OC Not Arrived'),
);
export const SET_SORT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Option'),
  props<{sort: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{searchTerm: string}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Search Type'),
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
