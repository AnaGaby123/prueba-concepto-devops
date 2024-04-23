/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IControlSupplierClaim,
  initialIControlSupplierClaim,
  TITLE_CONTROL_SUPPLIER_CLAIM,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.models';
import {controlSupplierClaimActions} from '@appActions/pendings/product-to-claim/control-supplier-claim';
import {controlSupplierClaimListReducer} from '@appReducers/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.reducer';
import {controlSupplierClaimDetailsReducer} from '@appReducers/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.reducer';

export const controlSupplierClaimReducer: ActionReducer<IControlSupplierClaim> = combineReducers({
  title: createReducer(TITLE_CONTROL_SUPPLIER_CLAIM),
  detailsMode: createReducer(
    initialIControlSupplierClaim().detailsMode,
    on(controlSupplierClaimActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIControlSupplierClaim().allowToDetails,
    on(
      controlSupplierClaimActions.SET_ALLOWED_TO_DETAILS,
      (state, {allowToDetails}) => allowToDetails,
    ),
  ),
  controlSupplierClaimList: controlSupplierClaimListReducer,
  controlSupplierClaimDetails: controlSupplierClaimDetailsReducer,
});
