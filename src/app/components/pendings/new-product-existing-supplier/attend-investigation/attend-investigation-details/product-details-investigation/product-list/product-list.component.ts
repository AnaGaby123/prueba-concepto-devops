// CORE
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// ACTIONS
// SELECTORS
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';

import {API_REQUEST_STATUS_LOADING, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {debounce, isEmpty} from 'lodash-es';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {attendInvestigationDetailsListProductActions} from '@appActions/pendings/attend-investigation';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {IProductCardItem} from '@appModels/shared-components/product-card-item.models';
import {IProductInvestigation} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';

// UTILS
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  listTrademark$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectCatTrademark,
  );
  itemTrademark$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedItemTradeMark,
  );
  itemLines$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectListLines,
  );
  selectedLine$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedItemLines,
  );
  listTypeProducts$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductsType,
  );
  itemTypeProduct$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedItemProductType,
  );
  listPrice$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectCatPrice,
  );
  itemPrice$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedItemPrice,
  );
  listProductState$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectListProducts,
  );
  itemStatus$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedItemStatus,
  );
  searchTerm$: Observable<string> = this.store.select(
    attendInvestigationDetailsSelectors.selectSearchTerm,
  );
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectTypesOfSearch,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTypeSearch,
  );
  optionsOfProduct$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectOptionsOfProducts,
  );
  optionOfProduct$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectOptionOfProduct,
  );
  optionsOfProductsStatus$: Observable<number> = this.store.select(
    attendInvestigationDetailsSelectors.selectOptionsOfProductsStatus,
  );
  listProducts$: Observable<Array<IProduct>> = this.store.select(
    attendInvestigationDetailsSelectors.selectListProduct,
  );
  apiStatus$: Observable<number> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductsStatus,
  );
  typeList$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectTypeList,
  );
  totalProducts$: Observable<number> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductsTotal,
  );
  detailsProductIsOpen$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectDetailsProductIsOpen,
  );
  showProductsCat$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.showCatProducts,
  );
  itemAttentionProduct$: Observable<IProduct> = this.store.select(
    attendInvestigationDetailsSelectors.selectItemAttentionProduct,
  );
  selectedProductInvestigation$: Observable<IProductInvestigation> = this.store.select(
    attendInvestigationDetailsSelectors.selectedProductInvestigation,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  readonly apiRequestStatusLoading = API_REQUEST_STATUS_LOADING;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH); // Before value of time was 0

  isEmpty = isEmpty;
  scrollItems: Array<IProduct> = [];
  showRightSideBar = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.INIT_PRODUCT_LIST_EFFECT());
  }

  setFilter(item: DropListOption, node: string): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS());
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.UPDATE_FILTER_SELECTED({item, node}),
    );
  }

  setSortDirection(item: DropListOption): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS());
    this.store.dispatch(attendInvestigationDetailsListProductActions.UPDATE_SORT_DIRECTION({item}));
  }

  fetchMoreProducts(event: IPageInfo) {
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.FETCH_MORE_PRODUCTS_EFFECT({
        event,
      }),
    );
  }

  getProducts(isFirstPage: boolean): void {
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_LOAD({isFirstPage}),
    );
  }

  changeSearchTerm(searchTerm: string): void {
    if (searchTerm) {
      this.store.dispatch(
        attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS({searchTerm}),
      );
    }
  }

  handleTypeSelected(type: DropListOption): void {
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.SET_TYPE_SEARCH({typeSearch: type}),
    );
  }

  handleSearchTermSelected(searchTerm: string): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS());
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.SET_RUN_SEARCH_TERM({searchTerm}),
    );
  }

  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS());
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.SET_OPTION_OF_PRODUCT_SELECTED({option}),
    );
  }

  handleClearSearchTerm(): void {
    this.store.dispatch(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS());
    this.store.dispatch(attendInvestigationDetailsListProductActions.CLEAR_SEARCH_TERM());
  }

  handleAddButtonClick(): void {
    this.store.dispatch(
      attendInvestigationDetailsListProductActions.HANDLE_ADD_BUTTON_CLICK_EFFECT(),
    );
  }

  buildItem(product: IProduct): IProductCardItem {
    return {
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Index: product.Index,
      Descripcion: product.Descripcion,
      Disponibilidad: product?.Disponibilidad,
      DisponibilidadClave: product.DisponibilidadClave,
      PrecioLista: product.PrecioLista,
      Subtipo: product.Subtipo,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      Presentacion: product.Presentacion,
      TotalAlternativo: product.TotalAlternativo,
      Uso: product.Uso,
      Unidad: product.Unidad,
      TotalComplementario: product.TotalComplementario,
      IdProducto: product.IdProducto,
      MonedaVentaProveedor: product.MonedaVentaProveedor,
      NombreMarca: product.NombreMarca,
      AgrupadorCaracteristica: product.AgrupadorCaracteristica,
      imageHover: product.imageHover,
      image: product.image,
      ImagePresentationHover: product.ImagePresentationHover,
      ImagePresentation: product.ImagePresentation,
    };
  }

  noReturnPredicate(): boolean {
    return false;
  }
}
