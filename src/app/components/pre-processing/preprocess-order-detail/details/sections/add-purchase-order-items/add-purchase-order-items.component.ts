import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

// Selectors
import {addItemSelectors, preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
// Models
import {IQuoteItem} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {ICard} from '@appModels/card/card';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
// Actions
import {addItemsQuoteActions, preProcessDetailsActions} from '@appActions/pre-processing';
import {debounce, isEmpty} from 'lodash-es';

import {appRoutes} from '@appHelpers/core/app-routes';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-add-purchase-order-items',
  templateUrl: './add-purchase-order-items.component.html',
  styleUrls: ['./add-purchase-order-items.component.scss'],
})
export class AddPurchaseOrderItemsComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    addItemSelectors.selectSearchTypes,
  );
  searchTypeSelected$: Observable<DropListOption> = this.store.select(
    addItemSelectors.selectSearchTypeSelected,
  );

  selectInternalSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    addItemSelectors.selectInternalSalesItemAddQuotation,
  );

  selectHeaderInternalSalesItem$: Observable<InternalSalesItem> = this.store.select(
    addItemSelectors.selectHeaderInternalSalesItem,
  );
  optionsCard$: Observable<Array<ICard>> = this.store.select(addItemSelectors.selectQuotesCardList);
  order$: Observable<IOrder> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );
  items$: Observable<Array<IQuoteItem>> = this.store.select(addItemSelectors.selectItemsList);
  searchTerm$: Observable<string> = this.store.select(addItemSelectors.selectSearchTerm);
  optionsListSearch$: Observable<Array<DropListOption>> = this.store.select(
    addItemSelectors.selectOptionsOfProductsSearch,
  );
  optionsLoading$: Observable<boolean> = this.store.select(
    addItemSelectors.selectLoadingOptionsSearch,
  );
  activeBtnAdd$: Observable<boolean> = this.store.select(addItemSelectors.selectActiveBtnAdd);
  itemSelected$: Observable<DropListOption> = this.store.select(addItemSelectors.selectItemSearch);
  apiStatus$: Observable<number> = this.store.select(addItemSelectors.selectAddItemApiStatus);
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  items: Array<IQuoteItem>;
  itemsInternal: InternalSalesItem[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private appService: CoreContainerService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(addItemsQuoteActions.CLEAN_BACKUP());
  }

  returnList(): void {
    this.store.dispatch(addItemsQuoteActions.INITIAL_STATE());

    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.preProcessing.preProcess,
      appRoutes.preProcessing.orderDetails,
      appRoutes.preProcessing.details,
      appRoutes.preProcessing.preItems,
    ]);
    this.store.dispatch(preProcessDetailsActions.SET_IS_IN_ADD_ITEM({isInAddItem: false}));
  }

  selectItemQuote(card: ICard): void {
    this.store.dispatch(addItemsQuoteActions.UPDATE_QUOTE_SELECTED({idQuoted: card.value}));
    this.store.dispatch(addItemsQuoteActions.FETCH_QUOTED_ITEMS_LOAD());
    this.store.dispatch(addItemsQuoteActions.FETCH_GM_FREIGHTS());
  }

  addItems(): void {
    this.store.dispatch(addItemsQuoteActions.ADD_ITEMS_PURCHASE_ORDER());
  }

  handleTrackByItem(index: number, item: InternalSalesItem): string {
    return item?.data?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion;
  }

  selectAllItems(value: boolean) {
    this.store.dispatch(addItemsQuoteActions.CHECKED_ALL_ITEMS({value}));
  }

  globalItemEventHeadersHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxHeaderBoxNormalItem:
        this.selectAllItems(event.value as boolean);
        break;
    }
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxNormalAction:
        this.selectItem(event.value as boolean, event.data as IQuoteItem);
        break;
      case NameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: event.dataInternal.columnNotes,
            modalIsOpen: event.value,
          }),
        );
        this.appService.setTarget(event.target);
        break;
    }
  }
  selectItem(value: boolean, item: IQuoteItem): void {
    if (value) {
      this.store.dispatch(addItemsQuoteActions.ADD_ITEM({item}));
    } else {
      this.store.dispatch(addItemsQuoteActions.DELETE_ITEM({item}));
    }
    this.store.dispatch(addItemsQuoteActions.UPDATE_SELECT_ITEM({item, value}));
  }

  //TODO: METODOS DEL BUSCADOR

  //DOCS: SE ejecuta al cambiar el tipo de búsqueda (Descripción,Cat, CAS)
  handleTypeOfSearch(filterType: DropListOption): void {
    this.store.dispatch(addItemsQuoteActions.SET_TYPE_FILTER_SEARCH({filterType}));
  }

  //DOCS: Se ejecuta al escribir sobre el buscador, obtiene las sugerencias de busqueda
  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(addItemsQuoteActions.GET_OPTIONS_OF_PRODUCTS({searchTerm}));
  }

  //DOCS: Se ejecuta al presionar la X sobre el buscador, limpia la busqueda
  clearSearchTerm(): void {
    this.store.dispatch(
      addItemsQuoteActions.FETCH_QUOTES_CLIENT_OF_SEARCH({
        product: {} as DropListOption,
        isSearch: false,
      }),
    );
  }

  //DOCS: Se ejecuta al presionar presionar "Enter" sobre el buscador, buscrá directo en los productos que tienen contrato
  handleSearchTermSelected(searchTerm: string): void {
    setTimeout(() => {
      this.store.dispatch(addItemsQuoteActions.SET_RUN_SEARCH_TERM({searchTerm}));
    }, 500);
  }

  //DOCS: Se ejecuta al seleccionar un elemento de la sugerencia de búsqueda
  handleOption(option: DropListOption): void {
    this.store.dispatch(
      addItemsQuoteActions.FETCH_QUOTES_CLIENT_OF_SEARCH({
        product: option,
        isSearch: true,
      }),
    );
  }
}
