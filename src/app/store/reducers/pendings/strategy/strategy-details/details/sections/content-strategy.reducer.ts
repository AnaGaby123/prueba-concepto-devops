/* Core Imports */
import {createReducer} from '@ngrx/store';

/* Models Imports */
import {
  IContentStrategyState,
  initialContentStrategyState,
} from '@appModels/store/pendings/strategy/strategy-details/details/sections/content-strategy.models';

/* Tools Imports */

const initialContentStrategy: IContentStrategyState = {
  ...initialContentStrategyState(),
};

export const contentStrategyReducer = createReducer(initialContentStrategy);
