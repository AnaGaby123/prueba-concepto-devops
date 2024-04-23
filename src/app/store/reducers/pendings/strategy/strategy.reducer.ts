import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialStrategyState,
  StrategyState,
  TITLE_STRATEGY,
} from '@appModels/store/pendings/strategy/strategy.model';
import {strategyDashboardReducer} from '@appReducers/pendings/strategy/strategy-dashboard/strategy-dashboard.reducer';
import {strategyDetailsReducer} from '@appReducers/pendings/strategy/strategy-details/strategy-details.reducer';
import {strategyActions} from '@appActions/pendings/strategy';

export const strategyReducer: ActionReducer<StrategyState> = combineReducers(
  {
    strategyDashboard: strategyDashboardReducer,
    strategyDetails: strategyDetailsReducer,
    detailsMode: createReducer(
      initialStrategyState().detailsMode,
      on(strategyActions.SET_DETAILS_MODE, (state, {detailsMode}) => detailsMode),
    ),
    enableEdit: createReducer(
      initialStrategyState().enableEdit,
      on(strategyActions.SET_ENABLE_EDIT, (state, {enableEdit}) => enableEdit),
    ),
    strategyDetailsComponent: createReducer(
      initialStrategyState().strategyDetailsComponent,
      on(strategyActions.SET_DETAILS_COMPONENT, (state, {detailsComponent}) => detailsComponent),
    ),
    title: createReducer(
      TITLE_STRATEGY,
      on(strategyActions.SET_TITLE, (state, {title}) => title),
    ),
  },
  {...initialStrategyState()},
);
