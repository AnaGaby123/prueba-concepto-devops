// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class PricesClientsFormProvidersPanelMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  // DOCS SE OBTIENE UNA PAGINA MÁS DE PROVEEDORES
  fetchMoreProviders$ = createEffect(() =>
    this.action$.pipe(
      ofType(pricesActions.FETCH_MORE_PROVIDERS_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(clientPricesSelectors.selectFetchMoreProvidersInfo)),
      mergeMap(
        ([{event}, {itemList, itemsTotalLength, listRequestStatus, desiredPage, totalPages}]) => {
          if (
            event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
            event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
            itemsTotalLength === 0 || // DOCS No hay resultados
            desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
            itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
            listRequestStatus === 1 // DOCS Se está obteniendo una página
          ) {
            return of(RETURN_EMPTY());
          }
          return of(pricesActions.GET_PROVIDERS_LIST_LOAD({isFirstPage: false}));
        },
      ),
    ),
  );
}
