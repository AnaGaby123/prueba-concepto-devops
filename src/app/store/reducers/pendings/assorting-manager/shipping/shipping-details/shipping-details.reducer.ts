import {ActionReducer, createReducer, on} from '@ngrx/store';

// Models
import {
  initialIShippingDetails,
  IPackingListShipping,
  IShippingDetails,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping-details/shipping-details.models';

// Actions
import {shippingDetailsActions} from '@appActions/pendings/assorting-manager/shipping';

// Utils
import {filter, map} from 'lodash-es';

export const shippingDetailsReducer: ActionReducer<IShippingDetails> = createReducer(
  initialIShippingDetails(),
  on(
    shippingDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IShippingDetails => ({...initialIShippingDetails()}),
  ),
  on(
    shippingDetailsActions.FETCH_PACKING_LIST_SUCCESS,
    (state: IShippingDetails, {packingList}): IShippingDetails => ({
      ...state,
      packingList,
    }),
  ),
  on(
    shippingDetailsActions.SET_SELECTED_PACKING_LIST,
    (state: IShippingDetails, {packingListId}): IShippingDetails => ({
      ...state,
      packingList: map(state.packingList, (o: IPackingListShipping) => {
        if (o.IdFCCFolioPagoCliente === state.selectedPackingList.IdFCCFolioPagoCliente) {
          return {
            ...state.selectedPackingList,
            isSelected: o.IdFCCFolioPagoCliente === packingListId,
          };
        } else if (o.IdFCCFolioPagoCliente === packingListId) {
          return {...o, isSelected: true};
        }
        return {...o, isSelected: false};
      }),
      selectedPackingList: filter(
        state.packingList,
        (o: IPackingListShipping) => o.IdFCCFolioPagoCliente === packingListId,
      )[0],
    }),
  ),
  on(
    shippingDetailsActions.SET_PACKING_LIST_STATUS,
    (state: IShippingDetails, {packingListStatus}): IShippingDetails => ({
      ...state,
      packingListStatus,
    }),
  ),
);
