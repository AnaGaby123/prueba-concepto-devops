import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {productLinkedSelectors} from '@appSelectors/forms/product-form';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {productLinkedActions} from '@appActions/forms/product-form';
import {Producto} from 'api-catalogos';
import {debounce, isEmpty} from 'lodash-es';
import {IPageInfo, VirtualScrollerComponent} from '@iharbeck/ngx-virtual-scroller';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {take} from 'rxjs/operators';
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {
  IProductCardItem,
  IProductLinked,
} from '@appModels/shared-components/product-card-item.models';
import {
  IVProducto,
  IVProductoAlternativo,
  IVProductoComplementario,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

const FILE_NAME = 'link-alternative-complementary.ts';

@Component({
  selector: 'app-link-alternative-complementary',
  templateUrl: './link-alternative-complementary.component.html',
  styleUrls: ['./link-alternative-complementary.component.scss'],
})
export class LinkAlternativeComplementaryComponent implements OnInit, OnDestroy {
  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    productLinkedSelectors.selectTabOptions,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    productLinkedSelectors.selectTabSelected,
  );
  searchTerm$: Observable<string> = this.store.select(productLinkedSelectors.selectSearchTerm);
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    productLinkedSelectors.selectOptionTypesSearch,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    productLinkedSelectors.selectedTypeOfSearch,
  );
  suggestApiStatus$: Observable<number> = this.store.select(
    productLinkedSelectors.selectSuggestStatus,
  );
  optionOfProducts$: Observable<Array<DropListOption>> = this.store.select(
    productLinkedSelectors.selectOptionsOfProducts,
  );
  selectProductList$: Observable<Array<IVProducto>> = this.store.select(
    productLinkedSelectors.selectJoinProductList,
  );
  selectedSearchValue$: Observable<DropListOption> = this.store.select(
    productLinkedSelectors.selectedSearchOption,
  );

  lodashIsEmpty = isEmpty;
  scrollItems: Array<IVProducto | IVProductoAlternativo | IVProductoComplementario> = [];

  constructor(private store: Store<AppState>, private logger: NGXLogger) {}

  handleKeySearch = debounce(
    (value) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH, // Before value of time was 0
  );

  ngOnInit(): void {
    this.store.dispatch(productLinkedActions.FETCH_ALTERNATIVE_PRODUCTS_LOAD());
  }
  ngOnDestroy(): void {
    this.store.dispatch(productLinkedActions.CLEAN_PRODUCTS_LINKED());
  }

  setTab(option): void {
    this.store.dispatch(productLinkedActions.SET_SELECTED_TAB_OPTION({tabOptionSelected: option}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(productLinkedActions.SET_SEARCH_TERM({searchTerm}));
    this.store.dispatch(productLinkedActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD());
    this.store.dispatch(productLinkedActions.FETCH_PRODUCTS_LOAD({isFirstPage: true}));
    this.resetScroll();
  }

  handleClearSearchTerm(): void {
    this.store.dispatch(productLinkedActions.CLEAN_SEARCH_FILTER());
    this.resetScroll();
  }

  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(productLinkedActions.SET_SELECTED_SEARCH_OPTION({option}));
  }

  setTypeSelected(type: DropListOption): void {
    this.store.dispatch(productLinkedActions.SET_SELECTED_SEARCH_TYPE({searchTypeSelected: type}));
  }

  handleSearchTerm(): void {
    this.store.dispatch(productLinkedActions.FETCH_PRODUCTS_LOAD({isFirstPage: true}));
  }

  resetScroll(): void {
    try {
      this.virtualScroller.scrollToPosition(0);
    } catch (e) {
      this.logger.debug(
        servicesLogger.generateMessage(FILE_NAME, '@resetScroll: No se puede scrollear'),
      );
    }
  }

  setProductSelected(event: IProductLinked): void {
    if (event.value) {
      this.store.dispatch(
        productLinkedActions.SAVE_PRODUCT_RELATED_LOAD({
          product: event.product,
        }),
      );
    } else {
      this.store.dispatch(
        productLinkedActions.DISABLE_PRODUCT_RELATED_LOAD({
          product: event.product,
        }),
      );
    }
  }

  buildAlternativeItem(product): IProductCardItem {
    return {
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Descripcion: product.Descripcion,
      DisponibilidadClave: product.DisponibilidadClave,
      Disponibilidad: product?.Disponibilidad,
      IdProducto: product.IdProducto,
      IdProductoAlternativoRelacion: product.IdProductoAlternativoRelacion,
      Index: product.Index,
      NombreMarca: product.NombreMarca,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      Subtipo: product.Subtipo,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalAlternativo,
      Unidad: product.Unidad,
      Uso: product.Uso,
      imageHover: product.imageHover,
      image: product.image,
      ImagePresentation: product.ImagePresentation,
      ImagePresentationHover: product.ImagePresentationHover,
    } as IProductCardItem;
  }

  buildComplementaryItem(product): IProductCardItem {
    return {
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Descripcion: product.Descripcion,
      DisponibilidadClave: product.DisponibilidadClave,
      Disponibilidad: product?.Disponibilidad,
      IdProducto: product.IdProducto,
      IdProductoComplementarioRelacion: product.IdProductoComplementarioRelacion,
      Index: product.Index,
      NombreMarca: product.NombreMarca,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      Subtipo: product.Subtipo,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalComplementario,
      Unidad: product.Unidad,
      Uso: product.Uso,
      imageHover: product.imageHover,
      image: product.image,
      ImagePresentation: product.ImagePresentation,
      ImagePresentationHover: product.ImagePresentationHover,
    } as IProductCardItem;
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const products: Array<Producto> = await lastValueFrom(
      this.store.pipe(select(productLinkedSelectors.selectJoinProductList), take(1)),
    );

    if (event.endIndex !== products.length - 1) {
      return;
    }

    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(productLinkedSelectors.selectTotalResults), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(productLinkedSelectors.selectCurrentPage), take(1)),
    );
    const isLoading: number = await lastValueFrom(
      this.store.pipe(select(productLinkedSelectors.selectProductsListStatus), take(1)),
    );

    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (currentPage > totalPages || products.length > currentTotal) {
        return;
      }
      if (!(isLoading === API_REQUEST_STATUS_LOADING)) {
        setTimeout(async () => {
          this.getProducts(false);
        }, 200);
      }
    }
  }

  getProducts(isFirstPage: boolean): void {
    this.store.dispatch(productLinkedActions.FETCH_PRODUCTS_LOAD({isFirstPage}));
  }
}
