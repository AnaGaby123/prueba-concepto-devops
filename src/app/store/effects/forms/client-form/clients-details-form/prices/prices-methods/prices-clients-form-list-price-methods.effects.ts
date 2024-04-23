import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {pricesActions} from '@appActions/forms/client-form';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import * as pricesSelector from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import {PAGING_LIMIT} from '@appUtil/common.protocols';

@Injectable()
export class PricesClientsFormListPriceMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  fetchMoreProviders$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FETCH_MORE_PRICES_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(pricesSelector.selectTabPrices)),
        mergeMap(([{event}, prices]) => {
          if (event.endIndex !== prices.pricesList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = prices.pricesList.TotalResults;
          const currentPage: number = prices.desiredPage;
          const isLoading: boolean = prices.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || prices.pricesList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('prices');
                this.store.dispatch(pricesActions.GET_PRICE_LOAD());
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  setSearchTermPrices$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SET_SEARCH_TERM_PRICES_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(pricesSelector.selectTabPrices)),
        mergeMap(([{searchTerm}, prices]) => {
          this.setNeedsToReload('prices');
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_SEARCH_TERM({
              searchTerm,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  filterConfiguredPrices$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FILTER_CONFIGURED_PRICES_COMPONENT_EFFECT),
        mergeMap(() => {
          this.setNeedsToReload('prices');
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
              tabConfigurationName: 'prices',
            }),
          );
          this.store.dispatch(pricesActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  setNeedsToReload(selectedTab: string) {
    this.store.dispatch(
      pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }
}
