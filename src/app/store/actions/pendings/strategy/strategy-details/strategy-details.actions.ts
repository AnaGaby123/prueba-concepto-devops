import {createAction, props} from '@ngrx/store';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {
  IBrandWithContract,
  IEntriesPercentages,
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyResponse,
  QuotationClientInfo,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {GMCotFletes, GMEstrategia} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'StrategyDetailsApi';
const typeReducer = 'StrategyDetails';

export const CLEAN_CLIENT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Clean Client Data'),
);
export const SET_SELECTED_CLIENT_STRATEGY = createAction(
  buildingStringActionType(typeReducer, 'Set Client Strategy Selected'),
  props<{selectedClient: IStrategyByClient}>(),
);
export const SAVE_STRATEGY = createAction(buildingStringActionType(typeApi, 'Save Strategy'));
export const SAVE_STRATEGY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save Strategy Failed'),
);
export const SAVE_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Strategy Success'),
  props<{response: GMEstrategia}>(),
);
export const FETCH_QUOTES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotes Success.'),
  props<{quotationsList: Array<IQuotation>; selectedQuotation: IQuotation}>(),
);
export const FETCH_QUOTES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotes Failed.'),
);

export const FETCH_FREIGHT = createAction(buildingStringActionType(typeApi, 'Fetch Freight'));
export const FETCH_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Freight Success'),
  props<{freight: GMCotFletes}>(),
);
export const FETCH_FREIGHT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Freight Failed'),
);
export const SET_QUOTATION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation Selected'),
  props<{idQuotation: string}>(),
);
export const SET_QUOTATION_SELECTED_V2 = createAction(
  buildingStringActionType(typeReducer, 'Set  Quotation Selected V2'),
  props<{selectedQuotation: IQuotation}>(),
);
export const SET_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Contact'),
  props<{contacts: IContact}>(),
);

export const FETCH_ITEMS_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Quotation'),
  props<{isFirstPage: boolean}>(),
);

export const FETCH_ITEMS_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotations Load'),
);
export const FETCH_ITEMS_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotations Success'),
  props<{response: IQueryResultIItemQuotation; currentPage: number}>(),
);
export const FETCH_ITEMS_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Quotations Failed'),
);
export const FETCH_BRANDS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Brands Failed'),
);
export const FETCH_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Brands Success'),
  props<{brands: Array<IBrandWithContract>}>(),
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
  props<{id: string; value: boolean; textJustification: string}>(),
);
export const SET_OPTION_STRATEGY_SUB_TACTIC = createAction(
  buildingStringActionType(typeReducer, 'Set Option Strategy SubTactic'),
  props<{
    idTactic: string;
    idSubTactic: string;
    value: boolean;
    isMultiSubTactic: boolean;
    textJustification: string;
  }>(),
);
export const SET_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option'),
  props<{tab: ITabOption}>(),
);
export const CLEAN_ALL_STRATEGY_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Clean All Strategy Detail'),
);
export const SET_SELECTED_BRAND = createAction(
  buildingStringActionType(typeReducer, 'Set Brand Selected'),
  props<{brandSelectedFilter: DropListOption}>(),
);
export const FETCH_QUOTATION_DETAIL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Detail Failed'),
);
export const FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Info For Selected Quotation Success'),
  props<{queryResult: QuotationClientInfo}>(),
);
export const FETCH_SELECTED_QUOTE_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Selected Quote Brands Success'),
  props<{brandsSelectedQuotation: Array<DropListOption>}>(),
);

export const FETCH_BAR_PERCENTAGES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Percentages Success'),
  props<{itemsBarPercentage: IEntriesPercentages}>(),
);

export const FETCH_BAR_PERCENTAGES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Percentages Failed'),
);
export const SET_LOAD_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set load quotation file'),
);
export const SET_ERROR_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set error quotation file'),
);
