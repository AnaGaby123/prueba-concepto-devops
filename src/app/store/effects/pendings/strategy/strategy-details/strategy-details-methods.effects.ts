/* Core imports*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {
  strategyActions,
  strategyDashboardActions,
  strategyDetailsActions,
} from '@appActions/pendings/strategy';
import {map, withLatestFrom} from 'rxjs/operators';
import {
  GET_CAT_MONEDA_LOAD,
  GET_CAT_TIPO_TELEFONO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';
import {offerSelectors} from '@appSelectors/pendings/strategy/strategy-details/details';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable()
export class StrategyDetailsMethodsEffects {
  constructor(private actions$: Actions, private store: Store, private router: Router) {}

  /*DOCS: Inicializador del componente*/
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDashboardActions.INIT_STRATEGY_DASHBOARD_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(strategyActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
        this.store.dispatch(strategyDashboardActions.SET_ACTIVE_CHART({active: true}));
        return strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_INIT();
      }),
    ),
  );

  //DOCS: OBTENER UNA PÁGINA MÁS DE PARTIDAS DE LA COTIZACIÓN SELECCIONADA
  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(offerSelectors.selectFetchMoreClientsInfo)),
      map(([{event}, {itemList, itemsTotalLength, listRequestStatus, desiredPage, totalPages}]) => {
        if (
          event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
          event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
          itemsTotalLength === 0 || // DOCS No hay resultados
          desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
          itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
          listRequestStatus === 1 // DOCS Se está obteniendo una página
        ) {
          return offerActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT_FAILED();
        }
        return strategyDetailsActions.FETCH_ITEMS_QUOTATION({isFirstPage: false});
      }),
    ),
  );

  //DOCS: GUARDAR EL CLIENTE QUE SE SELECCIONÓ EN EL DASHBOARD Y NAVEGA A LA LISTA DETALLE
  handleItemListClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDashboardActions.HANDLE_SET_CLIENT_EFFECT),
      map(({selectedClient}) => {
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.store.dispatch(GET_CAT_TIPO_TELEFONO_LOAD());
        this.store.dispatch(strategyDetailsActions.SET_SELECTED_CLIENT_STRATEGY({selectedClient}));
        this.store.dispatch(strategyDashboardActions.SET_ACTIVE_CHART({active: false}));
        this.store.dispatch(strategyActions.SET_DETAILS_MODE({detailsMode: true}));
        this.store.dispatch(strategyActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.strategy.strategy,
          appRoutes.strategy.strategyDetails,
        ]);
        return RETURN_EMPTY();
      }),
    ),
  );
}
