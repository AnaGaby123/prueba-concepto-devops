// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import * as pricesSelector from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
// UTILS
import {PAGING_LIMIT} from '@appUtil/common.protocols';

@Injectable()
export class PricesClientsFormProductMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  filterConfiguredProducts$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FILTER_CONFIGURED_PRODUCTS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.setNeedsToReload('products');
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
              tabConfigurationName: 'products',
            }),
          );
          this.store.dispatch(pricesActions.GET_THIS_LEVEL_PRODUCTS_LIST_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  fetchMoreProducts$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FETCH_MORE_PRODUCTS_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(pricesSelector.selectedFamilyProducts)),
        mergeMap(([{event}, products]) => {
          if (event.endIndex !== products.productsList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = products.productsList.TotalResults;
          const currentPage: number = products.desiredPage;
          const isLoading: boolean = products.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || products.productsList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('products');
                this.store.dispatch(pricesActions.GET_PRODUCTS_LIST_LOAD());
              }, 200);
            }
          }
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
