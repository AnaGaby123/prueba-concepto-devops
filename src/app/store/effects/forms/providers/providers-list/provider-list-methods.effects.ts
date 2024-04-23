/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
/*MODELS*/
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
/*ACTIONS*/
import {
  generalDataProviderActions,
  providerActions,
  providersListActions,
} from '@appActions/forms/providers';
/*SELECTORS*/
import {providerListSelectors} from '@appSelectors/forms/providers';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable()
export class ProviderListMethodsEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private router: Router) {}

  onInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providersListActions.ON_INIT_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(providersListActions.FETCH_PROVIDERS_FILTERS());
          this.store.dispatch(
            providerActions.SET_TITLE({
              title: 'CATÁLOGO DE PROVEEDORES',
            }),
          );
          this.store.dispatch(providerActions.SET_MODE_EDIT({modeEdit: false}));
          this.store.dispatch(
            providerActions.SET_ADD_EDIT_COMPONENT({
              addEditComponent: false,
            }),
          );
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersListActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(providerListSelectors.selectFetchMoreProvidersInfo)),
      mergeMap(([action, providersInfo]) => {
        const {
          itemList,
          itemsTotalLength,
          listRequestStatus,
          desiredPage,
          totalPages,
        }: IFetchMoreItemsInfo = providersInfo;
        if (
          action.event.endIndex !== itemList.length - 1 ||
          action.event.endIndex === itemsTotalLength - 1 ||
          itemsTotalLength === 0 ||
          desiredPage > totalPages ||
          itemList.length > itemsTotalLength ||
          listRequestStatus === 1
        ) {
          return EMPTY;
        } else {
          return of(providersListActions.FETCH_CAT_PROVIDERS({isFirstPage: false}));
        }
      }),
    ),
  );

  navigateToAddEditProviders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providersListActions.NAVIGATE_TO_ADD_OR_EDIT),
        mergeMap((action) => {
          let title = 'AGREGAR PROVEEDOR';
          if (action.edit) {
            title = 'VER PROVEEDOR';
            this.store.dispatch(providerActions.SET_MODE_EDIT({modeEdit: true}));
            this.store.dispatch(
              providersListActions.SET_SELECTED_PROVIDER({
                provider: action.provider,
              }),
            );

            this.store.dispatch(
              generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
                fieldName: 'IdProveedor',
                fieldValue: action.provider.IdProveedor,
                dataModelType: 'provider',
              }),
            );
          } else {
            this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: true}));
            this.store.dispatch(generalDataProviderActions.SET_PROVIDER_BACKUP());
          }
          this.store.dispatch(providerActions.SET_TITLE({title}));
          this.store.dispatch(
            providerActions.SET_ADD_EDIT_COMPONENT({
              addEditComponent: true,
            }),
          );
          this.router.navigate([
            appRoutes.protected,
            appRoutes.catalogs.catalogs,
            appRoutes.catalogs.providers.providers,
            appRoutes.catalogs.providers.addEditProviders,
          ]);
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
