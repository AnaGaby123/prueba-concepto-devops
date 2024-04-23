/* Core Imports */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IPageInfo, VirtualScrollerComponent} from '@iharbeck/ngx-virtual-scroller';
import {debounce} from 'lodash-es';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
/* Actions Imports */
import {
  listQuotesActions,
  offlineProductActions,
  quotationDetailsActions,
  totalQuotePdfActions,
} from '@appActions/quotation';
import {GET_CAT_BRANDS_LOAD} from '@appActions/catalogs/marca.actions';
import {GET_CAT_LINES_LOAD} from '@appActions/catalogs/lineas.actions';
import {
  GET_CAT_PRESENTATION_TYPE_LOAD,
  GET_TIPO_PRODUCTO_LOAD,
} from '@appActions/catalogs/catalogos.actions';

/* Selectors Imports */
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Tools Imports */
/* Animations Imports */
import {arrowYAnimation, fadeAnimation} from '@appUtil/animations';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {VCotCotizacion} from 'api-logistica';
import {ProductsTypes, PurchaseRestrictions} from '@appHelpers/pending/quotation/quotation.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import * as actionsUtils from '@appActions/utils/utils.action';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.scss'],
  animations: [fadeAnimation, arrowYAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsManagerComponent implements OnInit, AfterViewInit {
  @ViewChild(VirtualScrollerComponent, {static: false}) virtualScroller: VirtualScrollerComponent;
  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('imageElementList') imageElementList: ElementRef;
  base64$: Observable<string> = this.store.select(quotationDetailsSelectors.selectBase64PDF);

  brandListOptions$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectCatBrand,
  );
  brandListSelectedOption$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedBrandFilter,
  );
  productTypeListOptions$: Observable<DropListOption[]> = this.store.select(
    quotationDetailsSelectors.selectCatProductType,
  );
  productTypeListSelectedOption$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedProductTypeFilter,
  );
  productsSearchResults$: Observable<Array<ProductSearchResult>> = this.store.select(
    quotationDetailsSelectors.selectProductsSearchResults,
  );
  listProductsStatus$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectProductsSearchResultsStatus,
  );
  searchTypesOptions$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectTypesOfSearchOptions,
  );
  searchTypeSelectedOption$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectSearchTypeSelectedOption,
  );
  options$: Observable<ITabOption[]> = this.store.select(quotationDetailsSelectors.selectOptions);
  optionSelected$: Observable<ITabOption> = this.store.select(
    quotationDetailsSelectors.selectOptionSelected,
  );
  optionsOfProducts$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectOptionsOfProducts,
  );
  optionsOfProductsStatus$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectOptionsOfProductsStatus,
  );
  optionOfProduct$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectOptionOfProduct,
  );
  quotesLinked$: Observable<Array<VCotCotizacion>> = this.store.select(
    quotationDetailsSelectors.selectItemSelected,
  );
  searchTerm$: Observable<string> = this.store.select(quotationDetailsSelectors.selectSearchTerm);
  runSearchTerm$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectRunSearchTerm,
  );
  total$: Observable<number> = this.store.select(quotationDetailsSelectors.selectTotal);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  isNewClient$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsNewClient,
  );
  selectInternalSalesItemProductSearchResults$: Observable<InternalSalesItem[]> = this.store.select(
    quotationDetailsSelectors.selectInternalSalesItemProductSearchResults,
  );

  readonly viewTypes = AppViewTypes;
  readonly productsTypes = ProductsTypes;
  readonly purchaseRestrictions = PurchaseRestrictions;

  apiRequestStatusDefault = API_REQUEST_STATUS_DEFAULT;
  apiRequestStatusLoading = API_REQUEST_STATUS_LOADING;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  defaultuuid = DEFAULT_UUID;
  handleValidateNumber = debounce(
    (pieces: string, product: ProductSearchResult) => this.validateNumber(pieces, product),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  openOpop = false;
  fileName: string;
  toolTipPop = false;
  targetPop: any;
  isPdf = false;
  validators = InputValidators;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  imageNativeElementList;
  errorImageNativeElement = false;

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_BRANDS_LOAD());
    this.store.dispatch(GET_TIPO_PRODUCTO_LOAD());
    this.store.dispatch(GET_CAT_LINES_LOAD());
    this.store.dispatch(GET_CAT_PRESENTATION_TYPE_LOAD());
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }

    if (this.imageElementList) {
      this.imageNativeElementList = this.renderer.selectRootElement(
        this.imageElementList,
      ).nativeElement;
    }
  }

  onProductSelected(product: ProductSearchResult): void {
    this.store.dispatch(
      listQuotesActions.SET_PRODUCT_SELECTED({
        product,
      }),
    );
    this.virtualScroller.invalidateAllCachedMeasurements();
    setTimeout(() => {
      this.virtualScroller.invalidateAllCachedMeasurements();
    }, 1000);
  }

  setFilter(item: DropListOption, field: string): void {
    this.store.dispatch(listQuotesActions.SET_FILTER_SELECTED({field, item}));
  }

  changeSearchTerm(runSearchTerm: string): void {
    // DOCS: Solo realiza la búsqueda para llenar las opciones del buscador
    this.store.dispatch(listQuotesActions.GET_OPTIONS_OF_PRODUCTS({runSearchTerm}));
  }

  open(event) {
    this.openOpop = !event;
  }

  handleSearchTermEnter(searchTerm: string): void {
    // DOCS: Ejecuta la búsqueda con un termino al dar Enter
    this.store.dispatch(listQuotesActions.SET_RUN_SEARCH_TERM({searchTerm}));
  }

  handleItemSelected(option: DropListOption): void {
    // TODO: Ejecutara la búsqueda con un producto en específico
    this.store.dispatch(listQuotesActions.SET_OPTION_OF_PRODUCT_SELECTED({option}));
  }

  handleClearSearchTerm(): void {
    this.store.dispatch(listQuotesActions.CLEAR_SEARCH_TERM());
  }

  onClickOfflineProducts(): void {
    this.store.dispatch(offlineProductActions.NAVIGATE_OFFLINE_PRODUCT_INIT_EFFECT());
  }

  stop(event): void {
    event.stopPropagation();
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    // this.setImage();
  }

  validateNumber(pieces: string, product: ProductSearchResult): void {
    const typeNumber = /^$|^[1-9]+$|null/;
    if (typeNumber.test(pieces)) {
      this.setPieces(+pieces, product);
    }
  }

  handleTrackByFn(index: number, product: InternalSalesItem): string {
    return product?.data?.IdProducto;
  }

  setPieces(pieces: any, item: ProductSearchResult): void {
    this.store.dispatch(listQuotesActions.SET_PIECES_PRODUCT_LOAD({pieces, item}));
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(quotationDetailsActions.FETCH_MORE_COMPONENT_EFFECT({event}));
  }

  setImage(src?: string): string {
    if (this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }

    if (this.imageElementList) {
      this.imageNativeElementList = this.renderer.selectRootElement(
        this.imageElementList,
      ).nativeElement;
    }

    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  openQuotation(event: Event, product: ProductSearchResult): void {
    event.stopPropagation();
    this.store.dispatch(listQuotesActions.FETCH_QUOTATION_RELATED_LOAD({product}));
  }

  typeSearch(type: DropListOption): void {
    this.store.dispatch(listQuotesActions.SET_TYPE_SEARCH({typeSearch: type}));
  }

  // openLinkedFile(IdArchivo, folio): void {
  //   this.fileName = 'FO-' + folio;
  //   this.isPdf = true;
  //   this.toolTipPop = false;
  //   this.viewPDF = true;
  //   this.store.dispatch(listQuotesActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
  // }

  redirectViewPdfFile(quotation: VCotCotizacion): void {
    this.store.dispatch(
      totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT({
        isLinkedQuote: true,
        quotation,
        navigate: true,
      }),
    );
  }

  openLinkedQuoted(pop: string, isOpen: boolean, item?, target?: any): void {
    if (item) {
      this.store.dispatch(
        listQuotesActions.UPDATE_LIST_PRODUCTS({
          IdProducto: item.IdProducto,
        }),
      );
      this.toolTipPop = !this.toolTipPop;
      this.targetPop = target;
    }
  }

  addProductToCart(value: ProductSearchResult) {
    this.store.dispatch(actionsUtils.FETCH_NON_WORKING_DAYS_LOAD());
    this.store.dispatch(
      quotationDetailsActions.SHOW_REALIZATION_DATES_DIALOG({trainingItem: value}),
    );
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.InternalSalesAction:
        this.onProductSelected(event.data);
        break;
    }
  }
}
