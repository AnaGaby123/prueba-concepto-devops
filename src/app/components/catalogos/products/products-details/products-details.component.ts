import {Component, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  productDetailsSelectors,
  productLinkedSelectors,
  productSelectors,
} from '@appSelectors/forms/product-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

import {Router} from '@angular/router';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {productDetailsActions, productFormActions} from '@appActions/forms/product-form';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {take} from 'rxjs/operators';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  PRODUCTS_CATALOG_TITLE,
  PRODUCTS_CATALOG_TITLE_EDIT_PRODUCT,
  PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
} from '@appModels/store/forms/product-form/product-form-.module';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private router: Router) {}

  enableRightArrow = false;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  editMode$: Observable<boolean> = this.store.select(productSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(productSelectors.selectEnableEdit);
  actualStep$: Observable<ITabOption> = this.store.select(
    productDetailsSelectors.selectedActualStep,
  );
  hasChages$: Observable<boolean> = this.store.select(
    productDetailsSelectors.handleChangesValidator,
  );
  steps$: Observable<Array<ITabOption>> = this.store.select(productDetailsSelectors.selectSteps);
  alternativesLenght$: Observable<number> = this.store.select(
    productLinkedSelectors.selectAlternativesLength,
  );
  complementariesLenght$: Observable<number> = this.store.select(
    productLinkedSelectors.selectComplementariesLenght,
  );
  popAlert$: Observable<boolean> = this.store.select(productDetailsSelectors.selectPopAlert);
  saveValidator$: Observable<boolean> = this.store.select(
    productDetailsSelectors.saveButtonValidator,
  );
  viewTypes = AppViewTypes;
  tabOption: ITabOption = null;

  ngOnInit(): void {
    this.store.dispatch(
      productFormActions.SET_IS_IN_DETAILS({
        isInDetails: true,
      }),
    );
    this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_MODELO_DIFUSION_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_MONEDA_LOAD());
  }

  ngOnDestroy(): void {
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
  }

  async selectOptionBar(currentTab: ITabOption): Promise<void> {
    const haveChanges = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.handleChangesValidator), take(1)),
    );
    const enableEdit = await lastValueFrom(
      this.store.pipe(select(productSelectors.selectEnableEdit), take(1)),
    );
    this.tabOption = currentTab;
    if (enableEdit && haveChanges) {
      this.store.dispatch(productDetailsActions.SHOW_CONFIRM_DIALOG({currentTab}));
    } else {
      this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
      this.store.dispatch(
        productFormActions.SET_ACTUAL_STEP_NUMBER({
          actualStep: currentTab,
        }),
      );
    }
  }

  async cancelForm(): Promise<void> {
    const haveChanges = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.handleChangesValidator), take(1)),
    );
    if (haveChanges) {
      this.store.dispatch(productDetailsActions.SHOW_CONFIRM_DIALOG({}));
    } else {
      this.store.dispatch(productDetailsActions.CLEAN_BACKUP());
      this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
      this.store.dispatch(
        productFormActions.SET_TITLE({
          title: PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
        }),
      );
    }
  }

  async cancelAdd(): Promise<void> {
    const haveChanges = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.handleChangesValidatorAdd), take(1)),
    );
    if (haveChanges) {
      this.store.dispatch(productDetailsActions.SHOW_CONFIRM_DIALOG({}));
    } else {
      this.router.navigate([
        appRoutes.protected,
        appRoutes.catalogs.catalogs,
        appRoutes.catalogs.products.products,
      ]);
    }
  }

  // DOCS guarda los datos
  saveData(): void {
    this.store.dispatch(productDetailsActions.SAVE_DATA_COMPONENT_EFFECT());
  }

  // DOCS pasa a modo edicion y genera el backup
  enableEditMode(): void {
    this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: true}));
    this.store.dispatch(productDetailsActions.GENERATE_BACKUP());
    this.store.dispatch(
      productFormActions.SET_TITLE({
        title: PRODUCTS_CATALOG_TITLE_EDIT_PRODUCT,
      }),
    );
  }

  async discardOrContinue(value: boolean): Promise<void> {
    if (value) {
      const tabSelected = await lastValueFrom(
        this.store.pipe(select(productDetailsSelectors.selectedActualStep), take(1)),
      );
      const editMode = await lastValueFrom(
        this.store.pipe(select(productSelectors.selectEditMode), take(1)),
      );
      switch (tabSelected.id) {
        // DOCS: ESTA VALIDACION SOLO ES PARA LA TAB 1, EL RESTO SOLO DEBE DISPARAR LA ACCION PARA REESTABLECER BACKUP
        case '1':
          if (!editMode) {
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
      if (this.tabOption) {
        this.store.dispatch(
          productFormActions.SET_ACTUAL_STEP_NUMBER({
            actualStep: this.tabOption,
          }),
        );
      }
    }
    this.tabOption = null;
  }
}
