import {createReducer, on} from '@ngrx/store';
import {
  IFollowPPromiseDetails,
  IFollowPPromiseItem,
  initialIFollowPPromiseDetails,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {followPPromiseDetailsActions} from '@appActions/pendings/follow-purchase-promise';
import {map} from 'lodash-es';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export const followPPromiseDetailsReducer = createReducer(
  initialIFollowPPromiseDetails(),
  on(
    followPPromiseDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IFollowPPromiseDetails => ({...initialIFollowPPromiseDetails()}),
  ),
  on(
    followPPromiseDetailsActions.SET_SEARCH_TERM,
    (state: IFollowPPromiseDetails, {searchTerm}): IFollowPPromiseDetails => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_SELECTED_SEARCH_OPTION,
    (state: IFollowPPromiseDetails, {selectedSearchOption}): IFollowPPromiseDetails => ({
      ...state,
      selectedSearchOption,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_CLIENT_FOLLOW_SELECTED,
    (state: IFollowPPromiseDetails, {customer}): IFollowPPromiseDetails => ({
      ...state,
      selectedClient: customer,
    }),
  ),
  on(
    followPPromiseDetailsActions.GET_CLIENT_DATA_SUCCESS,
    (state: IFollowPPromiseDetails, {clientData}): IFollowPPromiseDetails => ({
      ...state,
      clientData,
    }),
  ),
  on(
    followPPromiseDetailsActions.FETCH_DATES_TRAINING_SUCCESS,
    (state: IFollowPPromiseDetails, {items}): IFollowPPromiseDetails => ({
      ...state,
      items,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_ENTRIES_API_STATUS,
    (state: IFollowPPromiseDetails, {status}): IFollowPPromiseDetails => ({
      ...state,
      apiStatus: status,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_PROMISE_CHECK_VALUE,
    (state: IFollowPPromiseDetails, {value}): IFollowPPromiseDetails => ({
      ...state,
      promiseIsSelected: value,
      dateForPurchasePromise: !value ? null : state.dateForPurchasePromise,
      dateForPurchasePromiseString: !value ? null : state.dateForPurchasePromiseString,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_JUSTIFICATION_VALUE,
    (state: IFollowPPromiseDetails, {justification}): IFollowPPromiseDetails => ({
      ...state,
      justification,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_PURCHASE_PROMISE_DATE,
    (state: IFollowPPromiseDetails, {date, stringDate}): IFollowPPromiseDetails => ({
      ...state,
      dateForPurchasePromise: date,
      dateForPurchasePromiseString: stringDate,
    }),
  ),
  on(
    followPPromiseDetailsActions.SET_ITEM_CHECK_BOX_VALUE,
    (state: IFollowPPromiseDetails, {itemId, isCheckAllItems}): IFollowPPromiseDetails => {
      return {
        ...state,
        items: !itemId
          ? {
              ...state.items,
              Results: map(state.items.Results, (o: IFollowPPromiseItem) => {
                return {
                  ...o,
                  // DOCS: SET VALUE OF GENERAL CHECKBOX FOR ALL ITEMS
                  isSelected: isCheckAllItems,
                };
              }),
            }
          : {
              ...state.items,
              Results: map(state.items.Results, (o: IFollowPPromiseItem) =>
                o.IdCotPartidaCotizacion === itemId ? {...o, isSelected: !o.isSelected} : o,
              ),
            },
      };
    },
  ),
  on(followPPromiseDetailsActions.GET_BRANDS_SUCCESS, (state, {brands, idQuotation}) => ({
    ...state,
    items: {
      ...state.items,
      brands,
      brandSelected: {value: DEFAULT_UUID, label: 'Todas'},
    },
  })),
  on(followPPromiseDetailsActions.SET_BRAND_SELECTED, (state, {brand}) => ({
    ...state,
    items: {
      ...state.items,
      brandSelected: brand,
    },
  })),
  on(
    followPPromiseDetailsActions.FETCH_HISTORY_PURCHASE_PROMISE_SUCCESS,
    (state: IFollowPPromiseDetails, {justifications}): IFollowPPromiseDetails => ({
      ...state,
      justifications,
    }),
  ),
  on(
    followPPromiseDetailsActions.FETCH_QUOTATION_SUCCESS,
    (state: IFollowPPromiseDetails, {quotation}): IFollowPPromiseDetails => ({
      ...state,
      quotation,
    }),
  ),
  on(
    followPPromiseDetailsActions.FETCH_FREIGHTS_SUCCESS,
    (state: IFollowPPromiseDetails, {freights}): IFollowPPromiseDetails => ({
      ...state,
      freightsQuotation: freights,
    }),
  ),
);
