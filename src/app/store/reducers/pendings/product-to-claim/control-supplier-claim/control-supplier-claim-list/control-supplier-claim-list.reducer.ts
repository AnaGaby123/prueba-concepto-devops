/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';
/* Models Import */
import {
  IControlSupplierClaimList,
  initialIControlSupplierClaimList,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.models';
/*Actions Imports*/
import {controlSupplierClaimListActions} from '@appActions/pendings/product-to-claim/control-supplier-claim';

export const controlSupplierClaimListReducer: ActionReducer<IControlSupplierClaimList> = createReducer(
  {...initialIControlSupplierClaimList()},
  on(
    controlSupplierClaimListActions.SET_SEARCH_TERM,
    (state: IControlSupplierClaimList, {searchTerm}): IControlSupplierClaimList => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    controlSupplierClaimListActions.SET_SORT_SELECTED,
    (state: IControlSupplierClaimList, {sort}) => ({
      ...state,
      sortSelected: sort,
    }),
  ),
  on(
    controlSupplierClaimListActions.SET_TAB_SELECTED,
    (state: IControlSupplierClaimList, {tab}) => ({
      ...state,
      tabSelected: tab,
    }),
  ),
);
