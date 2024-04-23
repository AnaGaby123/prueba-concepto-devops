/*core imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/*action imports */
import {quotationActions, quotationDetailsActions} from '@appActions/quotation';

/*model imports */
import {
  initialQuotationState,
  QuotationState,
  TITLE_QUOTATION,
} from '@appModels/store/quotation/quotation.models';

/*reducer imports */
import {quotationDashboardReducer} from '@appReducers/quotation/quotation-dashboard/quotation-dashboard.reducer';
import {quotationDetailsReducer2} from '@appReducers/quotation/quotation-details/quotation-details.reducer';

export const quotationReducer: ActionReducer<QuotationState> = combineReducers(
  {
    quotationDashboard: quotationDashboardReducer,
    quotationDetails: quotationDetailsReducer2,
    allowAccessToDetails: createReducer(
      initialQuotationState().allowAccessToDetails,
      on(quotationActions.SET_DETAILS_MODE, (state, {detailsMode}) => detailsMode),
      on(
        quotationDetailsActions.RESTORE_INITIAL_STATE,
        (state) => initialQuotationState().allowAccessToDetails,
      ),
    ),
    enableEdit: createReducer(
      initialQuotationState().enableEdit,
      on(quotationActions.SET_ENABLE_EDIT, (state, {enableEdit}) => enableEdit),
    ),
    isInDetailsComponent: createReducer(
      initialQuotationState().isInDetailsComponent,
      on(quotationActions.SET_DETAILS_COMPONENT, (state, {detailsComponent}) => detailsComponent),
      on(
        quotationDetailsActions.RESTORE_INITIAL_STATE,
        (state) => initialQuotationState().isInDetailsComponent,
      ),
    ),
    hiddeBack: createReducer(
      initialQuotationState().hiddeBack,
      on(quotationActions.HIDDE_BACK, (state, {hiddeBack}) => hiddeBack),
      on(
        quotationDetailsActions.RESTORE_INITIAL_STATE,
        (state) => initialQuotationState().hiddeBack,
      ),
    ),
    title: createReducer(
      TITLE_QUOTATION,
      on(quotationActions.SET_TITLE, (state, {title}) => title),
      on(quotationDetailsActions.RESTORE_INITIAL_STATE, (state) => initialQuotationState().title),
    ),
    NavBarGeneralData: createReducer(
      initialQuotationState().NavBarGeneralData,
      on(quotationActions.SHOW_NAV_BAR, (state, {isCustomerNew}) => isCustomerNew),
      on(
        quotationDetailsActions.RESTORE_INITIAL_STATE,
        (state) => initialQuotationState().NavBarGeneralData,
      ),
    ),
    NavBarRequestQuotation: createReducer(
      initialQuotationState().NavBarRequestQuotation,
      on(quotationActions.SHOW_NAV_BAR_REQUEST, (state, {isRequestNew}) => isRequestNew),
      on(
        quotationDetailsActions.RESTORE_INITIAL_STATE,
        (state) => initialQuotationState().NavBarRequestQuotation,
      ),
    ),
  },

  {...initialQuotationState()},
);
