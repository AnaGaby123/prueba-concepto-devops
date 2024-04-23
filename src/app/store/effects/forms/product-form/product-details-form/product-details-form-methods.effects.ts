/* Core Imports*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';

/* Dev Tools*/
/* Services */
import {
  productDetailsActions,
  productFormActions,
  productLogisticActions,
  productRegulationActions,
  technicalCommercialInvestigationActions,
} from '@appActions/forms/product-form';
import {productDetailsSelectors, productSelectors} from '@appSelectors/forms/product-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {
  PRODUCTS_CATALOG_TITLE,
  PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
} from '@appModels/store/forms/product-form/product-form-.module';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

@Injectable()
export class ProductDetailsFormMethodsEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  // DOCS: Init de la vista detalle de productos
  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(productDetailsActions.INIT_PRODUCT_DETAILS_EFFECT),
      map((action) => {
        this.store.dispatch(
          productFormActions.SET_IS_IN_DETAILS({
            isInDetails: true,
          }),
        );
        this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_MODELO_DIFUSION_LOAD());
        return productDetailsActions.INIT_PRODUCT_DETAILS_EFFECT_SUCCESS();
      }),
    ),
  );

  ngOnDestroy$ = createEffect(() =>
    this.action$.pipe(
      ofType(productDetailsActions.DESTROY_PRODUCT_DETAILS_EFFECT),
      map((action) => {
        this.store.dispatch(
          productFormActions.SET_IS_IN_DETAILS({
            isInDetails: false,
          }),
        );
        this.store.dispatch(
          productFormActions.SET_TITLE({
            title: PRODUCTS_CATALOG_TITLE,
          }),
        );
        this.store.dispatch(
          productFormActions.SET_EDIT_MODE({
            editMode: false,
          }),
        );
        this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));

        this.store.dispatch(productDetailsActions.SET_INITIAL_STATE());
        return productDetailsActions.DESTROY_PRODUCT_DETAILS_EFFECT_SUCCESS();
      }),
    ),
  );

  saveData$ = createEffect(() =>
    this.action$.pipe(
      ofType(productDetailsActions.SAVE_DATA_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(productDetailsSelectors.selectedActualStep)),
      mergeMap(([action, tabSelected]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        switch (tabSelected.id) {
          case '1':
            return of(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_LOAD());
          case '2':
            return of(productRegulationActions.SAVE_REGULATION_DATA());
          case '3':
            return of(productLogisticActions.SAVE_LOGISTIC_FORM_LOAD());
        }
      }),
    ),
  );

  // DOCS: EFFECT TO SHOW CONFIRM DIALOG
  showConfirmDialog$ = createEffect(() =>
    this.action$.pipe(
      ofType(productDetailsActions.SHOW_CONFIRM_DIALOG),
      withLatestFrom(
        this.store.select(productDetailsSelectors.selectedActualStep),
        this.store.select(productSelectors.selectEditMode),
      ),
      mergeMap(([{currentTab}, tabSelected, isEditMode]) => {
        const dialogRef = this.dialog.open(
          ConfirmDialogComponent,
          buildDialogConfig({
            message: this.translateService.instant('formProduct.general.titleModal'),
          }),
        );

        dialogRef.afterClosed().subscribe((value: boolean) => {
          if (value) {
            switch (tabSelected.id) {
              // DOCS: ESTA VALIDACION SOLO ES PARA LA TAB 1, EL RESTO SOLO DEBE DISPARAR LA ACCION PARA REESTABLECER BACKUP
              case '1':
                if (!isEditMode) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.products.products,
                  ]);
                } else {
                  this.store.dispatch(productDetailsActions.CLEAN_BACKUP());
                }
                break;
              case '2':
                this.store.dispatch(productDetailsActions.CLEAN_BACKUP());
                break;
              case '3':
                this.store.dispatch(productDetailsActions.CLEAN_BACKUP());
                break;
              case '4':
                this.store.dispatch(productDetailsActions.CLEAN_BACKUP());
                break;
            }
            this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
            this.store.dispatch(
              productFormActions.SET_TITLE({
                title: PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
              }),
            );
            if (currentTab) {
              this.store.dispatch(
                productFormActions.SET_ACTUAL_STEP_NUMBER({
                  actualStep: currentTab,
                }),
              );
            }
          }
        });
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
