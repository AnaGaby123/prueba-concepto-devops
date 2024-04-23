import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {productLinkedActions} from '@appActions/forms/product-form';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {productLinkedSelectors} from '@appSelectors/forms/product-form';
import {EMPTY, of} from 'rxjs';
import {API_REQUEST_STATUS_LOADING, PAGING_LIMIT} from '@appUtil/common.protocols';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class LinkedAlternativeComplementaryMethodsEffects {
  constructor(private store: Store, private action$: Actions) {}

  fetchMore$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(productLinkedSelectors.selectJoinProductList),
        this.store.select(productLinkedSelectors.selectTotalResults),
        this.store.select(productLinkedSelectors.selectCurrentPage),
        this.store.select(productLinkedSelectors.selectProductsListStatus),
      ),
      mergeMap(([action, products, currentTotal, currentPage, isLoading]) => {
        if (action.event.endIndex !== products.length - 1) {
          return EMPTY;
        }
        if (action.event.endIndex !== currentTotal - 1 && currentTotal > 0) {
          const totalPages =
            currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
          if (currentPage > totalPages || products.length > currentTotal) {
            return of(RETURN_EMPTY());
          }
          if (!(isLoading === API_REQUEST_STATUS_LOADING)) {
            setTimeout(async () => {
              this.store.dispatch(productLinkedActions.FETCH_PRODUCTS_LOAD({isFirstPage: false}));
            }, 200);
          }
        }
      }),
    ),
  );
}
