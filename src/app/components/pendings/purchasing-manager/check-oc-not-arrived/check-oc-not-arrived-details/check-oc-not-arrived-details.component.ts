/* Core Imports */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Actions Imports */
import {
  checkOcNotArrivedActions,
  checkOcNotArrivedDetailsActions,
} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';
/* Selectors Imports */
import {checkNotArrivedDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived';
/* Models Imports */
import {
  IItems,
  IPurchaseOrder,
  ITotals,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {
  IItemsConfigTotals,
  IOcPartidaEdicionConImpactoFEE,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IDropdownButtonCustomValues} from '@appModels/dropdown-button-custom/dropdown-button-custom.model';
import {lastValueFrom, Observable} from 'rxjs';
import {ICard} from '@appModels/card/card';
import {OcPartidaEdicionConImpactoFEE} from 'api-logistica';
/* Utils Imports */
import {debounce, filter, isEmpty} from 'lodash-es';

/* Common Imports */
import {
  CHECK_PURCHASE_ORDER,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-check-oc-not-arrived-details',
  templateUrl: './check-oc-not-arrived-details.component.html',
  styleUrls: ['./check-oc-not-arrived-details.component.scss'],
})
export class CheckOcNotArrivedDetailsComponent implements OnInit, OnDestroy {
  families$: Observable<Array<ICard>> = this.store.select(
    checkNotArrivedDetailsSelectors.selectFamilies,
  );
  totalFamilies$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalFamilies,
  );
  totalsFamily$: Observable<ITotals> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalsOfFamilySelected,
  );
  tabOptions$: Observable<Array<DropListOption>> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTabOptions,
  );
  tabOptionSelected$: Observable<DropListOption> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTabOptionSelected,
  );
  dropDownValues$: Observable<IDropdownButtonCustomValues> = this.store.select(
    checkNotArrivedDetailsSelectors.selectDropDownValues,
  );
  dropDownOptionSelected$: Observable<string> = this.store.select(
    checkNotArrivedDetailsSelectors.selectDropDownOptionSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    checkNotArrivedDetailsSelectors.selectSearchTerm,
  );
  isLoadingFamilies$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.selectIsLoadingFamilies,
  );
  purchaseOrders$: Observable<Array<IPurchaseOrder>> = this.store.select(
    checkNotArrivedDetailsSelectors.selectPurchaseOrdersOfCurrentFamily,
  );
  purchaseOrderSelected$: Observable<IPurchaseOrder> = this.store.select(
    checkNotArrivedDetailsSelectors.selectPurchaseOrderSelected,
  );
  totalPurchaseOrders$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalPurchaseOrders,
  );
  isLoadingPurchaseOrder$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.selectIsLoadingPurchaseOrders,
  );
  isLoadingMorePurchaseOrder$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.selectIsLoadingMorePurchaseOrders,
  );
  totalPiecesOfCurrentOC$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalPiecesOfCurrentOC,
  );
  amountTotalOfCurrentOC$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalAmountOfCurrentOC,
  );
  clientsOfCurrentOC$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalClientsOfCurrentOC,
  );
  isLoadingMoreItems$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.selectIsLoadingMoreItems,
  );
  isLoadingItems$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.selectIsLoadingItems,
  );
  items$: Observable<Array<Array<IItems>>> = this.store.select(
    checkNotArrivedDetailsSelectors.selectItemsOfPurchaseOrderCurrent,
  );
  totalItems$: Observable<number> = this.store.select(
    checkNotArrivedDetailsSelectors.selectTotalItems,
  );
  saveValidator$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.validatorForWithOutImpactSaveConfigButton,
  );
  configTotals$: Observable<IItemsConfigTotals> = this.store.select(
    checkNotArrivedDetailsSelectors.selectItemsConfiguredTotals,
  );
  registerValidator$: Observable<boolean> = this.store.select(
    checkNotArrivedDetailsSelectors.validatorForRegisterButton,
  );
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    checkNotArrivedDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    checkNotArrivedDetailsSelectors.selectContactsProviderDropList,
  );

  purchaseOrdersResults: Array<IPurchaseOrder>;
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  timer;
  newPrice = null;
  viewType: string;
  mainIndex: number;
  modifiedItem: IItems = {} as IItems;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  checkOcNotArrived = CHECK_PURCHASE_ORDER;
  readonly STATUS = STATUS;
  status = STATUS;
  typesOfConfig = TYPES_OF_CONFIG;
  isOpenPopUpHistory = false;
  isOpenPopUpPrice = false;
  isOpenPopConfirm = false;
  itemToSee: IItems;
  listHistory: Array<IOcPartidaEdicionConImpactoFEE> = [];
  readonly inputValidators = InputValidators;

  constructor(private store: Store) {}

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  ngOnInit(): void {
    this.onResize();
  }

  fetchPurchaseOrder(): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_LOAD({
        isFirstPage: false,
      }),
    );
  }

  fetchItems(): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.FETCH_ITEMS_LOAD({
        isFirstPage: false,
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      checkOcNotArrivedActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(
      checkOcNotArrivedActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(checkOcNotArrivedDetailsActions.CLEAN_ALL_CHECK_OC());
  }

  async fetchMorePurchaseOrders(event: IPageInfo): Promise<void> {
    const purchaseOrders: Array<IPurchaseOrder> = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectPurchaseOrdersOfCurrentFamily),
        take(1),
      ),
    );

    if (event.endIndex !== purchaseOrders.length - 1) {
      return;
    }

    const currentTotalPurchaseOrders: number = await lastValueFrom(
      this.store.pipe(select(checkNotArrivedDetailsSelectors.selectTotalPurchaseOrders), take(1)),
    );

    const currentPage: number = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectDesiredPageOfCurrentFamily),
        take(1),
      ),
    );

    const isLoading: boolean = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectIsLoadingPurchaseOrders),
        take(1),
      ),
    );

    if (event.endIndex !== currentTotalPurchaseOrders - 1 && currentTotalPurchaseOrders > 0) {
      const totalPages =
        currentTotalPurchaseOrders >= PAGING_LIMIT
          ? Math.ceil(currentTotalPurchaseOrders / PAGING_LIMIT)
          : 0;
      if (
        currentPage > totalPages ||
        purchaseOrders.length > currentTotalPurchaseOrders ||
        isLoading ||
        purchaseOrders.length === 0
      ) {
        return;
      }

      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_PURCHASE_ORDERS({
          isLoadingMorePurchases: true,
        }),
      );

      await this.fetchNextChunkOC();
    }
  }

  fetchNextChunkOC(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.fetchPurchaseOrder();
        resolve([]);
      }, 200);
    });
  }

  async fetchMoreItems(event: IPageInfo): Promise<void> {
    const items: Array<Array<IItems>> = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectItemsOfPurchaseOrderCurrent),
        take(1),
      ),
    );

    if (event.endIndex !== items.length - 1) {
      return;
    }

    const currentTotalItems: number = await lastValueFrom(
      this.store.pipe(select(checkNotArrivedDetailsSelectors.selectTotalItems), take(1)),
    );

    const currentPage: number = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectDesiredPageOfCurrentPurchaseOrder),
        take(1),
      ),
    );

    const isLoading: boolean = await lastValueFrom(
      this.store.pipe(select(checkNotArrivedDetailsSelectors.selectIsLoadingItems), take(1)),
    );

    if (event.endIndex !== currentTotalItems - 1 && currentTotalItems > 0) {
      const totalPages =
        currentTotalItems >= PAGING_LIMIT ? Math.ceil(currentTotalItems / PAGING_LIMIT) : 0;
      if (
        currentPage > totalPages ||
        items.length > currentTotalItems ||
        isLoading ||
        items.length === 0
      ) {
        return;
      }

      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_ITEMS({
          isLoadingMoreItems: true,
        }),
      );

      await this.fetchNextChunkItems();
    }
  }

  fetchNextChunkItems(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.fetchItems();
        resolve([]);
      }, 200);
    });
  }

  handlePopUpHistory(isOpen: boolean, item: IItems): void {
    this.isOpenPopUpHistory = isOpen;
    this.itemToSee = item;
  }

  handleOpenPopPrice(i: number, item: IItems): void {
    this.mainIndex = i;
    this.modifiedItem = item;
    this.isOpenPopUpPrice = !this.isOpenPopUpPrice;
  }

  handleAlertOpenPop(emit?: boolean): void {
    this.isOpenPopConfirm = !this.isOpenPopConfirm;
    if (emit) {
      this.store.dispatch(checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_LOAD());
    }
  }

  handleClosePopPrice(emit: boolean): void {
    this.isOpenPopUpPrice = !this.isOpenPopUpPrice;
    if (emit) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.MODIFIED_PRICE_ITEM({
          i: this.mainIndex,
          item: {
            ...this.modifiedItem,
            tempPrecioLista: this.newPrice,
            tempTotalPartida: this.newPrice * this.modifiedItem.NumeroDePiezas,
          },
        }),
      );
    }
  }

  onSelectOption(tabSelected: DropListOption) {
    this.store.dispatch(checkOcNotArrivedDetailsActions.SET_TAB_OPTION_SELECTED({tabSelected}));
  }

  onSelectOptionCustom(value: string) {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_DROPDOWN_OPTION_SELECTED({
        dropDownOptionSelected: value,
      }),
    );
  }

  handleFamilySelected(card: ICard): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_FAMILY_SELECTED({
        idFamily: card.value,
      }),
    );
  }

  async selectOrder(purchaseOrder: IPurchaseOrder): Promise<void> {
    const selectedOrder = await lastValueFrom(
      this.store.pipe(select(checkNotArrivedDetailsSelectors.selectPurchaseOrderSelected), take(1)),
    );

    if (selectedOrder.IdOcOrdenDeCompra !== purchaseOrder.IdOcOrdenDeCompra) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_PURCHASE_ORDER_SELECTED({
          IdOcOrdenDeCompra: purchaseOrder.IdOcOrdenDeCompra,
        }),
      );
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  // TODO Al pasar entre un item que ya esta seleccionado en back order o con impacto a un item que igual esta seleccionado en su misma posicion no recarga las fechas iniciales y finales
  handleTrackBy(index: number, item: IPurchaseOrder): string {
    return item.IdOcOrdenDeCompra;
  }

  handleTrackByItem(index: number, item: IItems): string {
    return item.tempId;
  }

  handleTrackByArray(index: number): number {
    return index;
  }

  changeItemStatusActive(i: number, item: IItems, typeOfCheck: string, newStatus: string): void {
    if (
      (typeOfCheck === this.typesOfConfig.cancel && item.cancelStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.backOrder &&
        item.backOrderStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.impact && item.impactStatus !== this.status.active)
    ) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_CHECK_ACTIVE({
          i,
          item,
          typeOfCheck,
          newStatus,
        }),
      );
    }
  }

  async restoreConfig(mainIndex: number, secondIndex: number): Promise<void> {
    const items = await lastValueFrom(
      this.store.pipe(
        select(checkNotArrivedDetailsSelectors.selectItemsByPosition(mainIndex)),
        take(1),
      ),
    );
    // const originalItem = items[secondIndex - 1];
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.RESTORE_SOME_ITEMS({
        i: mainIndex,
        k: secondIndex - 1,
      }),
    );
  }

  changeItemStatusCancel(i: number, item: IItems, typeOfCheck: string): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_ITEM_CHECK_CANCEL({
        i,
        item,
        typeOfCheck,
      }),
    );
  }

  deleteItemConfiguration(i: number, item: IItems, typeOfCheck: string): void {
    const disptachs = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.impact]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT({
            i,
            item,
          }),
        );
      },
    };

    disptachs[typeOfCheck]();
  }

  saveItemConfiguration(i: number, item: IItems, typeOfCheck: string): void {
    const disptachs = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.impact]: () => {
        this.store.dispatch(
          checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT({
            i,
            item,
          }),
        );
      },
    };
    disptachs[typeOfCheck]();
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }

  getLastConfigurationOfItem(listConf: Array<OcPartidaEdicionConImpactoFEE>): string {
    const filteredList = filter(listConf, (conf: OcPartidaEdicionConImpactoFEE) => conf.Activo);
    return !isEmpty(filteredList) ? filteredList[0].FechaEstimadaArribo : null;
  }
}
