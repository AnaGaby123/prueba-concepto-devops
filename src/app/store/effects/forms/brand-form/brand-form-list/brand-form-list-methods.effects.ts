import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, withLatestFrom} from 'rxjs/operators';

// Actions
import {
  brandFormAction,
  brandFormDetailsAction,
  brandFormListAction,
} from '@appActions/forms/brand-form';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Selectors
import {brandFormSelectorsList} from '@appSelectors/forms/brand-form';

// Utils
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  TITLE_BRAND_FORM,
  TITLE_BRAND_SEE_FORM,
} from '@appModels/store/forms/brand-form/brand-form.models';

@Injectable({
  providedIn: 'root',
})
export class BrandFormListMethodsEffects {
  constructor(private store: Store<AppState>, private action$: Actions, private router: Router) {}

  /*DOCS: Inicializador del componente*/
  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormListAction.INIT_BRAND_FORM_LIST_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(brandFormListAction.FETCH_FILTERS_LIST_LOAD());
        this.store.dispatch(brandFormAction.SET_ALLOW_TO_DETAILS({allowToDetails: false}));
        this.store.dispatch(brandFormAction.SET_IS_IN_DETAILS({isInDetails: false}));
        this.store.dispatch(brandFormAction.SET_TITLE({title: TITLE_BRAND_FORM}));
        return brandFormListAction.GET_LIST_BRANDS_LOAD({
          isFirstPage: true,
        });
      }),
    ),
  );

  /*DOCS: Obtener mas marcas*/
  fetchMoreBrands$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormListAction.FETCH_MORE_BRANDS_EFFECT),
      withLatestFrom(this.store.select(brandFormSelectorsList.selectFetchMoreBrandsInfo)),
      map(([{event}, {itemList, itemsTotalLength, listRequestStatus, desiredPage, totalPages}]) => {
        // DOCS Validar antes de pedir la siguiente página
        if (
          event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
          event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
          itemsTotalLength === 0 || // DOCS No hay resultados
          desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
          itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
          listRequestStatus === 1 // DOCS Se está obteniendo una página
        ) {
          return brandFormListAction.FETCH_MORE_BRANDS_EFFECT_FAILED();
        }
        this.store.dispatch(
          brandFormListAction.SET_LOADING_CHARGER({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return brandFormListAction.GET_LIST_BRANDS_LOAD({
          isFirstPage: false,
        });
      }),
    ),
  );

  //DOCS: Efecto que obtiene la marca seleccionada y la envia a la vista detalles
  setBrand$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormListAction.SET_BRAND_EFFECT),
      map(({brand}) => {
        this.store.dispatch(brandFormAction.SET_TITLE({title: TITLE_BRAND_SEE_FORM}));
        this.store.dispatch(brandFormAction.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
        this.router.navigate([
          appRoutes.protected,
          appRoutes.catalogs.catalogs,
          appRoutes.catalogs.brands.brands,
          appRoutes.catalogs.brands.details,
        ]);
        return brandFormDetailsAction.SET_SELECTED_BRAND({brand});
      }),
    ),
  );
}
