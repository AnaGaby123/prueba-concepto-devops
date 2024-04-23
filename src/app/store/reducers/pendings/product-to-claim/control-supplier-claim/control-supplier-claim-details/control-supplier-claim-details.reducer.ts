/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IControlSupplierClaimDetails,
  initialIControlSupplierClaimDetails,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.models';
import {controlSupplierClaimDetailsActions} from '@appActions/pendings/product-to-claim/control-supplier-claim';

export const controlSupplierClaimDetailsReducer: ActionReducer<IControlSupplierClaimDetails> = createReducer(
  {...initialIControlSupplierClaimDetails()},
  on(
    controlSupplierClaimDetailsActions.SET_SEARCH_TERM,
    (state: IControlSupplierClaimDetails, {searchTerm}) => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    controlSupplierClaimDetailsActions.SET_SORT_SELECTED,
    (state: IControlSupplierClaimDetails, {sort}) => ({
      ...state,
      sort,
    }),
  ),
  on(
    controlSupplierClaimDetailsActions.SET_TAB_SELECTED,
    (state: IControlSupplierClaimDetails, {tab}) => ({
      ...state,
      tabSelected: tab,
    }),
  ),
);
