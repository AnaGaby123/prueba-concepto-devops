import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-replace-purchase-order-item',
  templateUrl: './replace-purchase-order-item.component.html',
  styleUrls: ['./replace-purchase-order-item.component.scss'],
})
export class ReplacePurchaseOrderItemComponent implements OnInit {
  ngOnInit(): void {}

  // DOCS Se comento porque se eliminara la seccion de reemplazar partida

  /*  lodash = _;
    original = ITEM_QUOTATION_TYPE_ORIGINAL;
    saving = ITEM_QUOTATION_TYPE_SAVING;
    complementary = ITEM_QUOTATION_TYPE_COMPLEMENTARY;
    alternative = ITEM_QUOTATION_TYPE_ALTERNATIVES;
    promotion = ITEM_QUOTATION_TYPE_PROMOTION;
    order$: Observable<IOrder> = this.store.select(
      preProcessOrderDetailsSelectors.selectPurchaseOrderItem,
    );
    searchTypes$: Observable<Array<DropListOption>> = this.store.select(
      addItemSelectors.selectSearchTypes,
    );
    typeFilterSelected$: Observable<DropListOption> = this.store.select(
      replaceItemSelectors.selectFilterSelected,
    );
    optionsCard$: Observable<Array<ICard>> = this.store.select(
      replaceItemSelectors.selectOptionsCard,
    );
    listOfItem$: Observable<Array<IQuoteItem>> = this.store.select(
      replaceItemSelectors.selectListOfItem,
    );
    loading$: Observable<boolean> = this.store.select(
      replaceItemSelectors.selectLoadingOptionsSearch,
    );
    itemSelected$: Observable<DropListOption> = this.store.select(
      replaceItemSelectors.selectItemSearch,
    );
    termSearch$: Observable<string> = this.store.select(replaceItemSelectors.selectSearchTerm);
    optionsListSearch$: Observable<Array<DropListOption>> = this.store.select(
      replaceItemSelectors.selectOptionsOfProductsSearch,
    );
    activeReplace$: Observable<boolean> = this.store.select(replaceItemSelectors.activeBtnReplace);
    itemReplace$: Observable<IPpPartidaPedidoDetalle> = this.store.select(selectEntrySelected);
    selectCurrencyLabel$: Observable<string> = this.store.select(
      preProcessOrderDetailsSelectors.selectCurrencyLabel,
    );
    listItem: Array<IQuoteItem> = [];
    productToSearch$: Observable<any>;
    handleKeySearch = _.debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit(): void {
      this.store.dispatch(replaceItemActions.FETCH_QUOTES_CLIENT());
    }
    changeSearchTerm(searchTerm: string): void {
      this.store.dispatch(replaceItemActions.GET_OPTIONS_OF_PRODUCTS({searchTerm}));
    }
    handleSearchTermSelected(searchTerm: string): void {
      this.store.dispatch(replaceItemActions.SET_RUN_SEARCH_TERM({searchTerm}));
    }
    typeOfSearch(filterType: DropListOption): void {
      this.store.dispatch(replaceItemActions.SET_TYPE_FILTER_SEARCH({filterType}));
      this.setValuesSearch({} as DropListOption);
    }
    handleOption(option: DropListOption): void {
      this.setValuesSearch(option);
    }
    clearSearch(): void {
      this.setValuesSearch({} as DropListOption);
    }
    setValuesSearch(product: DropListOption): void {
      this.store.dispatch(
        replaceItemActions.SET_QUOTES_CLIENT_OF_SEARCH({
          product,
        }),
      );
    }
    returnList(): void {
      this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.preProcessing.preProcess,
        appRoutes.preProcessing.orderDetails,
        appRoutes.preProcessing.details,
        appRoutes.preProcessing.preItems,
      ]);
    }
    replaceItem(): void {
      this.store.dispatch(replaceItemActions.REPLACE_ITEM_LOAD());
    }
    selectedQuote(quote: ICard): void {
      this.store.dispatch(replaceItemActions.UPDATE_QUOTE_SELECTED({idQuoted: quote.value}));
      this.store.dispatch(replaceItemActions.FETCH_QUOTED_ITEMS_LOAD());
    }
    itemSelected(value: boolean, item: IQuoteItem): void {
      if (value) {
        this.store.dispatch(replaceItemActions.SET_SELECT_ITEM({item, value}));
      }
    }*/
}
