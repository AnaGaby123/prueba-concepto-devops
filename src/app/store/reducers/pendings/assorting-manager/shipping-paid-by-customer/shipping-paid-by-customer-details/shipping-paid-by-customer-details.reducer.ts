import {ActionReducer, createReducer, on} from '@ngrx/store';

// Models
import {
  initialIShippingPaidByCustomerDetails,
  IShippingPaidByCustomerDetails,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details.models';
import {IPackingListShipping} from '@appModels/store/pendings/assorting-manager/shipping/shipping-details/shipping-details.models';

// Actions
import {shippingPaidByCustomerDetailsActions} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

// Utils
import {filter, map} from 'lodash-es';

export const shippingPaidByCustomerDetailsReducer: ActionReducer<IShippingPaidByCustomerDetails> = createReducer(
  initialIShippingPaidByCustomerDetails(),
  on(
    shippingPaidByCustomerDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IShippingPaidByCustomerDetails => ({
      ...initialIShippingPaidByCustomerDetails(),
    }),
  ),
  on(
    shippingPaidByCustomerDetailsActions.SET_SELECTED_CLIENT,
    (state: IShippingPaidByCustomerDetails, {selectedClient}): IShippingPaidByCustomerDetails => ({
      ...state,
      selectedClient,
    }),
  ),
  on(
    shippingPaidByCustomerDetailsActions.FETCH_PACKING_LIST_SUCCESS,
    (state: IShippingPaidByCustomerDetails, {packingList}): IShippingPaidByCustomerDetails => ({
      ...state,
      packingList,
    }),
  ),
  on(
    shippingPaidByCustomerDetailsActions.SET_SELECTED_PACKING_LIST,
    (state: IShippingPaidByCustomerDetails, {packingListId}): IShippingPaidByCustomerDetails => ({
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
    shippingPaidByCustomerDetailsActions.SET_PACKING_LIST_STATUS,
    (
      state: IShippingPaidByCustomerDetails,
      {packingListStatus},
    ): IShippingPaidByCustomerDetails => ({
      ...state,
      packingListStatus,
    }),
  ),
);
