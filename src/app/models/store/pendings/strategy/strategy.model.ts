import {
  initialStrategyDashboardState,
  StrategyDashboardyState,
} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {StrategyDetailsState} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {initialStrategyDetails} from '@appHelpers/pending/strategy/strategy.helpers';

export interface StrategyState {
  strategyDashboard: StrategyDashboardyState;
  strategyDetails: StrategyDetailsState;
  detailsMode: boolean;
  enableEdit: boolean;
  strategyDetailsComponent: boolean;
  title: string;
}

export const initialStrategyState = (): StrategyState => ({
  strategyDashboard: initialStrategyDashboardState(),
  strategyDetails: initialStrategyDetails(),
  detailsMode: false,
  enableEdit: false,
  strategyDetailsComponent: false,
  title: TITLE_STRATEGY,
});

export const TITLE_STRATEGY = 'Atender cierre';
