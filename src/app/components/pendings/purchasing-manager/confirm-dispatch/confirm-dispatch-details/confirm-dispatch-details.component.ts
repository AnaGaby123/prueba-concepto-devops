/* Core Imports */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Common Imports */
import {
  CONFIRM_DISPATCH,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';

/* Models Imports */
import {
  IItem,
  IPurchaseOrder,
  ITotalsItems,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {ImpListaArribo, OcPartida} from 'api-logistica';

/* Actions Imports */
import {confirmDispatchDetailsActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';
import {GET_CAT_FREIGHT_LOAD} from '@appActions/catalogs/catalogos.actions';

/* Selectors Imports */
import {confirmDispatchDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch';
import {selectCatFreightForDropDown} from '@appSelectors/catalogs/catalogs.selectors';

/* Utils Imports */
import {debounce, isEmpty} from 'lodash-es';

import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

@Component({
  selector: 'app-confirm-dispatch-details',
  templateUrl: './confirm-dispatch-details.component.html',
  styleUrls: ['./confirm-dispatch-details.component.scss'],
})
export class ConfirmDispatchDetailsComponent implements OnInit, OnDestroy {
  isLoadingItemsInSummary$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.selectItemsInSummaryIsLoading,
  );
  itemsInSummary$: Observable<Array<IItem>> = this.store.select(
    confirmDispatchDetailsSelectors.selectItemsInSummary,
  );
  isLoadingPurchaseOrders$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.selectIsLoadingPurchaseOrders,
  );
  purchaseOrders$: Observable<Array<IPurchaseOrder>> = this.store.select(
    confirmDispatchDetailsSelectors.selectPurchaseOrders,
  );
  purchaseOrderSelected$: Observable<IPurchaseOrder> = this.store.select(
    confirmDispatchDetailsSelectors.selectPurchaseOrderSelected,
  );
  arrivalList$: Observable<ImpListaArribo> = this.store.select(
    confirmDispatchDetailsSelectors.selectArrivalList,
  );
  packingListFile$: Observable<File> = this.store.select(
    confirmDispatchDetailsSelectors.selectPackingListFile,
  );
  guideFile$: Observable<File> = this.store.select(confirmDispatchDetailsSelectors.selectGuideFile);
  selectedFreightOption$: Observable<DropListOption> = this.store.select(
    confirmDispatchDetailsSelectors.selectedFreightOption,
  );
  viewMode$: Observable<'normal' | 'summary'> = this.store.select(
    confirmDispatchDetailsSelectors.selectTViewMode,
  );
  providerSelected$: Observable<IProvidersConfirmDispatch> = this.store.select(
    confirmDispatchDetailsSelectors.selectProviderSelected,
  );
  items$: Observable<Array<Array<IItem>>> = this.store.select(
    confirmDispatchDetailsSelectors.selectItems,
  );
  totalsItems$: Observable<ITotalsItems> = this.store.select(
    confirmDispatchDetailsSelectors.selectTotalsOfItem,
  );
  isLoadingItems$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.selectIsLoadingItemsCurrentOC,
  );
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    confirmDispatchDetailsSelectors.selectTabsWithTotals,
  );
  freightOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatFreightForDropDown,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    confirmDispatchDetailsSelectors.selectTabSelected,
  );
  saveValidator$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.validatorSaveConfigButton,
  );
  resumeValidator$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.validatorForResumeButton,
  );
  finishValidator$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.validatorForFinishButton,
  );
  noItemsConfigured$: Observable<boolean> = this.store.select(
    confirmDispatchDetailsSelectors.selectAllItemsArentConfigured,
  );
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    confirmDispatchDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    confirmDispatchDetailsSelectors.selectContactsProviderDropList,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  purchaseOrdersResults: Array<IPurchaseOrder> = [];
  lodashIsEmpty = isEmpty;
  readonly STATUS = STATUS;
  status = STATUS;
  typesOfConfig = TYPES_OF_CONFIG;
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  confirmDispatch = CONFIRM_DISPATCH;

  constructor(private store: Store) {}

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  ngOnInit(): void {
    this.onResize();
    this.store.dispatch(GET_CAT_FREIGHT_LOAD());
  }

  async selectOrder(purchaseOrder: IPurchaseOrder): Promise<void> {
    const selectedOrder = await lastValueFrom(
      this.store.pipe(select(confirmDispatchDetailsSelectors.selectPurchaseOrderSelected), take(1)),
    );

    if (purchaseOrder.IdOcPackingList !== selectedOrder.IdOcPackingList) {
      this.store.dispatch(
        confirmDispatchDetailsActions.SET_PURCHASE_ORDER_SELECTED({
          IdOcPackingList: purchaseOrder.IdOcPackingList,
        }),
      );
    }
  }

  handleTrackByArray(index: number): number {
    return index;
  }

  // TODO: Arreglar cuando ya se realize la configuración
  handleTrackByItem(index: number, item: IItem): string {
    return item.tempId;
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.SET_TERM_SEARCH({
        searchTerm,
      }),
    );
  }

  tabSelected(tabSelected: ITabOption): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.SET_TAB_SELECTED({
        tabSelected,
      }),
    );
  }

  changeMode(viewMode: 'normal' | 'summary'): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.SET_VIEW_MODE({
        viewMode,
      }),
    );
    if (viewMode === 'normal') {
      this.store.dispatch(confirmDispatchDetailsActions.FETCH_ITEMS_LOAD());
    } else if (viewMode === 'summary') {
      this.store.dispatch(confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_LOAD());
    }
  }

  changeItemStatusActive(i: number, item: IItem, typeOfCheck: string, newStatus: string): void {
    if (
      (typeOfCheck === this.typesOfConfig.cancel && item.cancelStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.backOrder &&
        item.backOrderStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.confirm && item.confirmedStatus !== this.status.active)
    ) {
      this.store.dispatch(
        confirmDispatchDetailsActions.SET_ITEM_CHECK_ACTIVE({
          i,
          item,
          typeOfCheck,
          newStatus,
        }),
      );
    }
  }

  restoreConfig(mainIndex: number, secondIndex: number): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.RESTORE_SOME_ITEMS({
        i: mainIndex,
        k: secondIndex - 1,
      }),
    );
  }

  changeItemStatusCancel(i: number, item: IItem, typeOfCheck: string): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.SET_ITEM_CHECK_CANCEL({
        i,
        item,
        typeOfCheck,
      }),
    );
  }

  deleteItemConfiguration(i: number, item: IItem, typeOfCheck: string): void {
    const actions = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          confirmDispatchDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          confirmDispatchDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
    };

    actions[typeOfCheck]();
  }

  saveItemConfiguration(i: number, item: IItem, typeOfCheck: string): void {
    const actions = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          confirmDispatchDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          confirmDispatchDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
    };

    actions[typeOfCheck]();
  }

  confirmItems(): void {
    this.store.dispatch(confirmDispatchDetailsActions.CONFIRM_ITEMS_LOAD());
  }

  finishItems(): void {
    this.store.dispatch(confirmDispatchDetailsActions.FINISH_ITEMS_LOAD());
  }

  restoreItem(ocPartida: OcPartida): void {
    this.store.dispatch(confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_LOAD({ocPartida}));
  }

  setFieldValue(field: string, value: string | DropListOption | File): void {
    this.store.dispatch(confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE({field, value}));
  }

  confirmAllItems(): void {
    this.store.dispatch(confirmDispatchDetailsActions.CHECK_ALL_ITEMS());
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      confirmDispatchDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(confirmDispatchDetailsActions.CLEAN_ALL_CONFIRM_DISPATCH_DETAILS());
  }
}
