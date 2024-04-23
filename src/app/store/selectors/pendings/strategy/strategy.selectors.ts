/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectStrategy} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {StrategyState} from '@appModels/store/pendings/strategy/strategy.model';

export const selectStrategyDashboard = createSelector(
  selectStrategy,
  (state: StrategyState) => state.strategyDashboard,
);
export const selectStrategyDetails = createSelector(
  selectStrategy,
  (state: StrategyState) => state.strategyDetails,
);
export const selectDetailsMode = createSelector(
  selectStrategy,
  (state: StrategyState) => state.detailsMode,
);
export const selectEnableEdit = createSelector(
  selectStrategy,
  (state: StrategyState) => state.enableEdit,
);
export const selectStrategyDetailsComponent = createSelector(
  selectStrategy,
  (state: StrategyState) => state.strategyDetailsComponent,
);
export const selectTitle = createSelector(selectStrategy, (state: StrategyState) => state.title);
