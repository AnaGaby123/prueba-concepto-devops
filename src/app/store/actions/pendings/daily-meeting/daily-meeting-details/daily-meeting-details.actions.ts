import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  ICatStrategies,
  IEntriesPercentages,
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyResponse,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {buildingStringActionType} from '@appUtil/strings';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {GMCotFletes} from 'api-logistica';

const typeApi = 'DailyMeetingDetailsApi';
const typeReducer = 'DailyMeetingDetails';

export const FETCH_MORE_ITEMS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch More Items Component Effect'),
  props<{event: IPageInfo}>(),
);

export const FETCH_MORE_ITEMS_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Quotation'),
  props<{isFirstPage: boolean}>(),
);

export const FETCH_MORE_ITEMS_COMPONENT_EFFECT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch more Items Component Effect failed'),
);
export const SET_CURRENCY = createAction(
  buildingStringActionType(typeReducer, 'Set Currency'),
  props<{currency: string}>(),
);
export const FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotations by Selected Client Success'),
  props<{clientQuotes: Array<IQuotation>; quotationSelected: IQuotation}>(),
);
export const FETCH_QUOTATIONS_BY_SELECTED_CLIENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotations by Selected Client Success'),
);
export const SET_QUOTATION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation Selected'),
  props<{idQuotation: string}>(),
);
export const FETCH_ITEMS_QUOTATION_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotation Selected Success'),
  props<{response: IQueryResultIItemQuotation; currentPage: number}>(),
);
export const FETCH_ITEMS_QUOTATION_SELECTED_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotation Selected Failed'),
);
export const FETCH_ITEMS_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotation Selected'),
);

export const CLEAN_ALL_DAILY_MEETING_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Clean All Daily Meeting Detail'),
);
export const SET_SELECTED_EVI_DAILY_MEETING = createAction(
  buildingStringActionType(typeReducer, 'Set User Daily Meeting Selected'),
  props<{eviSelected: Evi}>(),
);

export const FETCH_BAR_PERCENTAGES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Percentages Success'),
  props<{itemsBarPercentage: IEntriesPercentages}>(),
);
export const FETCH_BAR_PERCENTAGES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Percentages Failed'),
);
export const SET_CAT_STRATEGIES = createAction(
  buildingStringActionType(typeApi, 'Set Cat Strategy'),
  props<{catStrategies: ICatStrategies}>(),
);
export const FETCH_QUOTATION_STRATEGY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Strategy Failed'),
);
export const FETCH_QUOTATION_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Strategy Success'),
  props<IQuotationStrategyResponse>(),
);
export const SET_OPTION_STRATEGY = createAction(
  buildingStringActionType(typeReducer, 'Set Option Strategy'),
  props<{data: DropListOption}>(),
);
export const SET_OPTION_STRATEGY_TACTIC = createAction(
  buildingStringActionType(typeReducer, 'Set Option Strategy Tactic'),
  props<{
    id: string;
    value: boolean;
    textObservation: string;
  }>(),
);
export const SET_OPTION_STRATEGY_SUB_TACTIC = createAction(
  buildingStringActionType(typeReducer, 'Set Option Strategy SubTactic'),
  props<{
    idTactic: string;
    idSubTactic: string;
    value: boolean;
    isMultiSubTactic: boolean;
    textObservation: string;
  }>(),
);
export const SAVE_STRATEGY = createAction(buildingStringActionType(typeApi, 'Save Strategy'));
export const SAVE_STRATEGY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save Strategy Failed'),
);
export const SAVE_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Strategy Success'),
);
export const SET_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option'),
  props<{tab: ITabOption}>(),
);

export const FETCH_FREIGHT = createAction(buildingStringActionType(typeApi, 'Fetch Freight'));

export const FETCH_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Freight Success'),
  props<{freight: GMCotFletes}>(),
);
export const FETCH_FREIGHT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Freight Failed'),
);
export const SET_LOAD_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set load quotation file'),
);
export const SET_ERROR_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set error quotation file'),
);
