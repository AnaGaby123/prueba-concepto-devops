import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {campaingsProviderActions} from '@appActions/forms/providers';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {campaignsProviderSelectors} from '@appSelectors/forms/providers';
import {isEmpty} from 'lodash-es';
import {PAGING_LIMIT} from '@appUtil/common.protocols';

@Injectable()
export class ProviderFormStep3CampaignMethodsEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  getDataHandler$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(campaingsProviderActions.GET_DATA_HANDLER_COMPONENT_EFFECT),
        mergeMap((action) => {
          if (action.from !== 'fetchMore') {
            this.store.dispatch(
              campaingsProviderActions.SET_ID_CAMPAIGN_BY_SELECTED({
                idCampaignBy: action.data,
              }),
            );
          }
          if (action.from === 'dropList') {
            this.store.dispatch(campaingsProviderActions.RESET_CURRENT_PAGES());
            this.store.dispatch(campaingsProviderActions.RESET_ITEMS_RELATED());
          }
          switch (action.data.label) {
            case 'Producto': {
              this.store.dispatch(campaingsProviderActions.GET_PRODUCTS_LOAD());
              break;
            }
            case 'Agrupador por característica': {
              this.store.dispatch(campaingsProviderActions.GET_CLASSIFICATIONS_LOAD());
              break;
            }
            case 'Marca':
              {
                this.store.dispatch(campaingsProviderActions.GET_TRADEMARK_LOAD());
              }
              break;
            default: {
              this.store.dispatch(
                campaingsProviderActions.FETCH_PROVIDER_FAMILIES_LOAD({
                  idSelected: action.data.label,
                }),
              );
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  textSearchHandler$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(campaingsProviderActions.TEXT_SEARCH_HANDLER_COMPONENT_EFFECT),
        mergeMap((action) => {
          switch (action.viewConfiguration.id) {
            case 'Producto': {
              this.store.dispatch(
                campaingsProviderActions.SET_SEARCH_TERM_PRODUCTS({
                  fieldValue: action.fieldValue,
                }),
              );
              break;
            }
            case 'Agrupador por característica': {
              this.store.dispatch(
                campaingsProviderActions.SET_SEARCH_TERM_CLASSIFICATIONS({
                  fieldValue: action.fieldValue,
                }),
              );
              break;
            }
            case 'Marca': {
              this.store.dispatch(
                campaingsProviderActions.SET_SEARCH_TERM_TRADEMARK({
                  fieldValue: action.fieldValue,
                }),
              );
              break;
            }
            default: {
              this.store.dispatch(
                campaingsProviderActions.SET_SEARCH_TERM_FAMILIES_PROVIDER({
                  fieldValue: action.fieldValue,
                }),
              );
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(campaignsProviderSelectors.getProducts),
        this.store.select(campaignsProviderSelectors.getFamiliesProvider),
        this.store.select(campaignsProviderSelectors.getClassifications),
        this.store.select(campaignsProviderSelectors.getTrademark),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
        this.store.select(campaignsProviderSelectors.currentPageProducts),
        this.store.select(campaignsProviderSelectors.currentPageProvidersFamilies),
        this.store.select(campaignsProviderSelectors.currentPageClassifications),
        this.store.select(campaignsProviderSelectors.currentPageTrademark),
      ),
      mergeMap(
        ([
          action,
          products,
          families,
          classifications,
          trademarks,
          filterSelected,
          currentProducts,
          currentFamilies,
          currentClassifications,
          currentTradeMark,
        ]) => {
          const list =
            action.listName === 'getProducts'
              ? products
              : action.listName === 'getFamiliesProvider'
              ? families
              : action.listName === 'getClassifications'
              ? classifications
              : trademarks;
          if (isEmpty(list)) {
            return EMPTY;
          }
          if (action.event.endIndex !== list.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = list.TotalResults;
          const currentPage: number =
            action.listName === 'getProducts'
              ? currentProducts
              : action.listName === 'getFamiliesProvider'
              ? currentFamilies
              : action.listName === 'getClassifications'
              ? currentClassifications
              : currentTradeMark;
          if (action.event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

            if (currentPage > totalPages || list.Results.length > currentTotal) {
              return EMPTY;
            }
            return of(
              campaingsProviderActions.GET_DATA_HANDLER_COMPONENT_EFFECT({
                data: filterSelected,
                from: 'fetchMore',
              }),
            );
          }
          return EMPTY;
        },
      ),
    ),
  );
}
