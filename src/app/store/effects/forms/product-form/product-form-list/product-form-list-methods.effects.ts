import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, withLatestFrom} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

// Actions
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {
  productDetailsActions,
  productFormActions,
  productListActions,
  technicalCommercialInvestigationActions,
} from '@appActions/forms/product-form';

// Selectors
import * as listProductSelectors from '@appSelectors/forms/product-form/product-form-list/product-form-list.selectors';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  PRODUCTS_CATALOG_TITLE_ADD_PRODUCT,
  PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
} from '@appModels/store/forms/product-form/product-form-.module';

@Injectable({
  providedIn: 'root',
})
export class ProductFormListMethodsEffects {
  constructor(
    private logger: NGXLogger,
    private store: Store<AppState>,
    private action$: Actions,
    private router: Router,
  ) {}

  // DOCS: Init de la lista de productos
  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(productListActions.INIT_PRODUCT_LIST_EFFECT),
      map((action) => {
        this.store.dispatch(catalogsActions.GET_CAT_AVALABILITY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRADEMARK_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_FAMILY_LINE_LOAD());
        this.store.dispatch(productListActions.GET_LIST_PRODUCT_LOAD({isFirstPage: true}));
        this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_BILLING_RESTRICTION_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PHYSICAL_STATE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_USE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PRESENTATION_TYPE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_APPLICATION_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRANSPORTATION_WAY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_UNIT_LOAD());
        return productListActions.INIT_PRODUCT_LIST_EFFECT_SUCCESS();
      }),
    ),
  );

  handleProductCardItemClick$ = createEffect(() =>
    this.action$.pipe(
      ofType(productListActions.HANDLE_PRODUCT_CARD_ITEM_CLICK_EFFECT),
      map(({selectedProductId}) => {
        if (selectedProductId) {
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_PRODUCT_SELECTED({
              productSelectedId: selectedProductId,
            }),
          );
        }
        this.store.dispatch(
          productFormActions.SET_TITLE({
            title: PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
          }),
        );
        this.store.dispatch(
          productFormActions.SET_EDIT_MODE({
            editMode: true,
          }),
        );

        this.router.navigate([
          appRoutes.protected,
          appRoutes.catalogs.catalogs,
          appRoutes.catalogs.products.products,
          appRoutes.catalogs.products.details,
        ]);

        return productListActions.HANDLE_PRODUCT_CARD_ITEM_CLICK_EFFECT_SUCCESS();
      }),
    ),
  );

  // DOCS: EFECTO PARA INICIALIZAR EL ESTADO PARA UN NUEVO REGISTRO Y REDIGIR AL FORMULARIO
  handleAddButtonClick$ = createEffect(() =>
    this.action$.pipe(
      ofType(productListActions.HANDLE_ADD_BUTTON_CLICK_EFFECT),
      map(() => {
        this.store.dispatch(
          productFormActions.SET_TITLE({
            title: PRODUCTS_CATALOG_TITLE_ADD_PRODUCT,
          }),
        );
        this.store.dispatch(
          productFormActions.SET_ENABLE_EDIT({
            enableEdit: true,
          }),
        );
        this.store.dispatch(productDetailsActions.GENERATE_BACKUP());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.catalogs.catalogs,
          appRoutes.catalogs.products.products,
          appRoutes.catalogs.products.details,
        ]);
        return productListActions.HANDLE_ADD_BUTTON_CLICK_EFFECT_SUCCESS();
      }),
    ),
  );

  /*DOCS: Obtener mas marcas*/
  fetchMoreProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(productListActions.FETCH_MORE_PRODUCTS_EFFECT),
      withLatestFrom(this.store.select(listProductSelectors.selectFetchMoreProductsInfo)),
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
          return productListActions.FETCH_MORE_PRODUCTS_EFFECT_FAILED();
        }
        return productListActions.GET_LIST_PRODUCT_LOAD({
          isFirstPage: false,
        });
      }),
    ),
  );
}
