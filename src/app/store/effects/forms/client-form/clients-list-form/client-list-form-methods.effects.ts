/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
/*ACTIONS*/
import {clientListFormActions, generalDataActions} from '@appActions/forms/client-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
/*SELECTORS*/
import {clientsListSelectors} from '@appSelectors/forms/clients-form';
/*MODELS*/
import {initialClientsState} from '@appModels/store/forms/clients-form/clients-form.models';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable()
export class ClientListFormMethodsEffects {
  constructor(private action$: Actions, private store: Store, private router: Router) {}

  // DOCS OBTIENE UNA PAGINA MAS DE CLIENTES
  fetchMore$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientListFormActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(clientsListSelectors.selectFetchMoreClientsInfo)),
      mergeMap(([action, fetchMore]) => {
        if (
          action.event.endIndex !== fetchMore.itemList.length - 1 ||
          action.event.endIndex === fetchMore.itemsTotalLength - 1 ||
          fetchMore.itemsTotalLength === 0 ||
          fetchMore.desiredPage > fetchMore.totalPages ||
          fetchMore.itemList.length > fetchMore.itemsTotalLength ||
          fetchMore.listRequestStatus === 1
        ) {
          return of(RETURN_EMPTY());
        }
        return of(clientListFormActions.FETCH_CAT_CLIENTS({isFirstPage: false}));
      }),
    ),
  );

  // DOCS INIT DEL LISTADO DE CLIENTES
  ngOnInit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientListFormActions.INIT_LIST_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(clientListFormActions.FETCH_CLIENT_FILTER());
          this.store.dispatch(clientsActions.SET_TITLE({title: initialClientsState().title}));
          this.store.dispatch(catalogsActions.GET_CAT_TIPO_TELEFONO_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_ROL_CLIENTS_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_SELLER_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_CUSTOMER_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_COMMERCIAL_LEADER_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_COORDINATOR_ESAC_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_IMPORTANCIAS_CLIENTE_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_SECTOR_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_INDUSTRIA_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS NAVEGACION HACIA DETALLES CUANDO SE SELECCIONA UN CLIENTE
  handleShowClient$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientListFormActions.HANDLE_SHOW_CLIENT_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(clientsActions.SET_EDIT_MODE({value: true}));
          this.store.dispatch(clientsActions.SET_TITLE({title: 'VER CLIENTE'}));
          this.router.navigate([
            appRoutes.protected,
            appRoutes.catalogs.catalogs,
            appRoutes.catalogs.clients.clients,
            appRoutes.catalogs.clients.details,
          ]);
          this.store.dispatch(
            clientsGeneralDataActions.GET_CLIENT_SELECTED({
              client: action.client,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS NAVEGACION A AGREGAR UN NUEVO CLIENTE
  addClient = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientListFormActions.ADD_CLIENT_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(clientsActions.SET_TITLE({title: 'AGREGAR CLIENTE'}));
          this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: true}));
          this.store.dispatch(generalDataActions.GENERATE_BACKUP());
          this.router.navigate([
            appRoutes.protected,
            appRoutes.catalogs.catalogs,
            appRoutes.catalogs.clients.clients,
            appRoutes.catalogs.clients.details,
          ]);
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
