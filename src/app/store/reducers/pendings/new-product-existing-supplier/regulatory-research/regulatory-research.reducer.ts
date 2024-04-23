import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialIRegulatoryResearchState,
  IRegulatoryResearchState,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.models';
import {regulatoryResearchActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {regulatoryResearchDashboardReducer} from '@appReducers/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.reducer';
import {regulatoryResearchDetailsReducer} from '@appReducers/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.reducer';

export const regulatoryResearchReducer: ActionReducer<IRegulatoryResearchState> = combineReducers({
  title: createReducer(
    initialIRegulatoryResearchState().title,
    on(regulatoryResearchActions.SET_TITTLE, (state, {title}) => title),
  ),
  allowToDetails: createReducer(
    initialIRegulatoryResearchState().allowToDetails,
    on(regulatoryResearchActions.SET_ALLOW_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
  ),
  isInDetails: createReducer(
    initialIRegulatoryResearchState().isInDetails,
    on(regulatoryResearchActions.SET_IS_IN_DETAILS, (state, {isInDetails}) => isInDetails),
  ),
  enableEdit: createReducer(
    initialIRegulatoryResearchState().enableEdit,
    on(regulatoryResearchActions.SET_ENABLE_EDIT, (state, {enableEdit}) => enableEdit),
  ),
  regulatoryResearchDashboard: regulatoryResearchDashboardReducer,
  regulatoryResearchDetails: regulatoryResearchDetailsReducer,
});
