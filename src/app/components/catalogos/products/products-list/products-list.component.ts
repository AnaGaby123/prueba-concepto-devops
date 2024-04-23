import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';

// Actions
import {productListActions} from '@appActions/forms/product-form';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';

// Selectors
import {productListSelectors} from '@appSelectors/forms/product-form';

// Dev Tools
import {API_REQUEST_STATUS_LOADING, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {debounce, isEmpty} from 'lodash-es';
import {IProductCardItem} from '@appModels/shared-components/product-card-item.models';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  listTrademark$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectCatTrademark,
  );
  itemTrademark$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectedItemTradeMark,
  );
  itemLines$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectListLines,
  );
  selectedLine$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectedItemLines,
  );
  listTypeProducts$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectProductsType,
  );
  itemTypeProduct$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectedItemProductType,
  );
  listPrice$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectCatPrice,
  );
  itemPrice$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectedItemPrice,
  );
  listProductState$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectListProducts,
  );
  itemStatus$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectedItemStatus,
  );
  searchTerm$: Observable<string> = this.store.select(productListSelectors.selectSearchTerm);
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectTypesOfSearch,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectTypeSearch,
  );
  optionsOfProduct$: Observable<Array<DropListOption>> = this.store.select(
    productListSelectors.selectOptionsOfProducts,
  );
  optionOfProduct$: Observable<DropListOption> = this.store.select(
    productListSelectors.selectOptionOfProduct,
  );
  optionsOfProductsStatus$: Observable<number> = this.store.select(
    productListSelectors.selectOptionsOfProductsStatus,
  );
  listProducts$: Observable<Array<IProduct>> = this.store.select(
    productListSelectors.selectListProduct,
  );
  apiStatus$: Observable<number> = this.store.select(productListSelectors.selectProductsStatus);
  typeList$: Observable<boolean> = this.store.select(productListSelectors.selectTypeList);
  totalProducts$: Observable<number> = this.store.select(productListSelectors.selectProductsTotal);

  readonly apiRequestStatusLoading = API_REQUEST_STATUS_LOADING;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH); // Before value of time was 0
  isEmpty = isEmpty;
  scrollItems: Array<IProduct> = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(productListActions.INIT_PRODUCT_LIST_EFFECT());
  }

  setFilter(item, node: string): void {
    this.store.dispatch(productListActions.SET_RESET_ITEMS());
    this.store.dispatch(productListActions.UPDATE_FILTER_SELECTED({item, node}));
  }

  setSortDirection(item): void {
    this.store.dispatch(productListActions.SET_RESET_ITEMS());
    this.store.dispatch(productListActions.UPDATE_SORT_DIRECTION({item}));
  }

  fetchMoreProducts(event: IPageInfo): void {
    this.store.dispatch(productListActions.FETCH_MORE_PRODUCTS_EFFECT({event}));
  }

  getProducts(isFirstPage): void {
    this.store.dispatch(productListActions.GET_LIST_PRODUCT_LOAD({isFirstPage}));
  }

  setTypeList(status: boolean): void {
    this.store.dispatch(productListActions.TYPE_DATAS_PRODUCTS({status}));
  }

  changeSearchTerm(searchTerm: string) {
    if (searchTerm) {
      this.store.dispatch(productListActions.GET_OPTIONS_OF_PRODUCTS({searchTerm}));
    } else {
      this.store.dispatch(productListActions.SET_RUN_SEARCH_TERM({searchTerm}));
    }
  }

  handleTypeSelected(type: DropListOption): void {
    this.store.dispatch(productListActions.SET_TYPE_SEARCH({typeSearch: type}));
  }

  handleSearchTermSelected(searchTerm: string): void {
    this.store.dispatch(productListActions.SET_RESET_ITEMS());
    this.store.dispatch(productListActions.SET_RUN_SEARCH_TERM({searchTerm}));
  }

  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(productListActions.SET_RESET_ITEMS());
    this.store.dispatch(productListActions.SET_OPTION_OF_PRODUCT_SELECTED({option}));
  }

  handleClearSearchTerm(): void {
    this.store.dispatch(productListActions.SET_RESET_ITEMS());
    this.store.dispatch(productListActions.CLEAR_SEARCH_TERM());
  }

  handleProductCardItemClick(selectedProductId: string): void {
    this.store.dispatch(
      productListActions.HANDLE_PRODUCT_CARD_ITEM_CLICK_EFFECT({
        selectedProductId,
      }),
    );
  }

  handleAddButtonClick(): void {
    this.store.dispatch(productListActions.HANDLE_ADD_BUTTON_CLICK_EFFECT());
  }

  buildItem(product: IProduct): IProductCardItem {
    return {
      IdProducto: product.IdProducto,
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
      MonedaVentaProveedor: product.MonedaVentaProveedor,
      NombreMarca: product.NombreMarca,
      imageHover: product.imageHover,
      image: product.image,
      ImagePresentation: product.ImagePresentation,
      ImagePresentationHover: product.ImagePresentationHover,
    };
  }
}
