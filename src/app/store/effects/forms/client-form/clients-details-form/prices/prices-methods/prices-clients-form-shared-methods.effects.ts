// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EMPTY} from 'rxjs';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import * as priceSelectors from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';

@Injectable()
export class PricesClientsFormSharedMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  // TODO implementar el mismo mecanismo de oferta para los precios de lista que ante se mostraban en el panel desplegable del lado derecho
  // DOCS SE OBTIENEN LOS PRECIOS DE LISTA
  getPricePageForPanel$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(priceSelectors.selectedLevelConfigurationTab),
          this.store.select(priceSelectors.selectAsidePrices),
        ),
        mergeMap(([{value}, {label}, asidePrices]) => {
          if (
            (value === -1 && asidePrices.desiredPage > 1) ||
            (value === 1 && asidePrices.desiredPage < asidePrices.pricesList.TotalResults)
          ) {
            this.store.dispatch(
              pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
              }),
            );
            this.store.dispatch(
              pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                value,
              }),
            );
            this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS SE MANDA EL TERMINO DE BUSQUEDA PARA LOS PRECIOS DE LISTA
  searchPriceForPanel$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SEARCH_FOR_PANEL_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(priceSelectors.selectedLevelConfigurationTab)),
        mergeMap(([{searchTerm}, {label}]) => {
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
              isLoading: true,
            }),
          );
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
              needsToReload: true,
            }),
          );
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM({
              searchTerm,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  setTarget$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SET_PREPARE_BREAKDOWN),
        withLatestFrom(
          this.store.select(clientPricesSelectors.haveChangesActualConfiguration),
          this.store.select(priceSelectors.selectPopBreakdownIsOpen),
        ),
        mergeMap(([action, hasChanges, isPopBreakDownOpen]) => {
          if (!hasChanges && !isPopBreakDownOpen) {
            this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
            this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: true}));
            this.store.dispatch(pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({value: 1}));
            this.store.dispatch(
              pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
              }),
            );
            this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
          } else if (!isPopBreakDownOpen) {
            this.store.dispatch(pricesActions.SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN({value: true}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
