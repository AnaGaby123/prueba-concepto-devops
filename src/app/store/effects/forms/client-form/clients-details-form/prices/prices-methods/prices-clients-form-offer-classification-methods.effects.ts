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
export class PricesClientsFormOfferClassificationMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  setSearchTermCharacteristicGrouper$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SET_SEARCH_TERM_CHARACTERISTIC_GROUPER_COMPONENT_EFFECT),
        mergeMap(({searchTerm}) => {
          this.setNeedsToReload('classifications');
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_SEARCH_TERM_CHARACTERISITC_GROUPER({
              searchTerm,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  filterConfiguredClassifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FILTER_CONFIGURED_CLASSIFICATIONS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.setNeedsToReload('classifications');
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
              tabConfigurationName: 'classifications',
            }),
          );
          this.store.dispatch(pricesActions.GET_THIS_LEVEL_CLASSIFICATIONS_LIST_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  fetchMoreClassifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.FETCH_MORE_CLASSIFICATION_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(pricesSelector.selectTabCharacteristicGrouper)),
        mergeMap(([{event}, classifications]) => {
          if (event.endIndex !== classifications.classificationsList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = classifications.classificationsList.TotalResults;
          const currentPage: number = classifications.desiredPage;
          const isLoading: boolean = classifications.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (
              currentPage > totalPages ||
              classifications.classificationsList.Results.length > currentTotal
            ) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('classifications');
                this.store.dispatch(pricesActions.GET_CLASSIFICATIONS_LOAD());
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
