/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectRouterState} from '@appCore/core.state';

export const selectCurrentRoute = createSelector(selectRouterState, (router) => router?.state?.url);
export const selectCurrentChildRoute = createSelector(selectCurrentRoute, (url) => {
  const split = url.split('/');
  return split[split.length - 1];
});
