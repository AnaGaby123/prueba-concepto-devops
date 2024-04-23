import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IDeclareArrivalTotals,
  IItemsDeclareArrival,
  IPurchaseOrderArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {
  IDeclareTransitArrivalDetails,
  IItemsDeclareTransitArrival,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.models';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

// Actions
import {
  declareTransitArrivalActions,
  declareTransitArrivalDetailsActions,
} from '@appActions/pendings/imports-phs/declare-transit-arrival';

// Selectors
import {declareTransitArrivalDetailsSelectors} from '@appSelectors/pendings/imports-phs/declare-transit-arrival';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-declare-transit-arrival-details',
  templateUrl: './declare-transit-arrival-details.component.html',
  styleUrls: ['./declare-transit-arrival-details.component.scss'],
})
export class DeclareTransitArrivalDetailsComponent implements OnDestroy, AfterViewInit {
  provider$: Observable<IProvider> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectProvider,
  );
  detailsNode$: Observable<IDeclareTransitArrivalDetails> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectDetails,
  );
  orders$: Observable<Array<IPurchaseOrderArrival>> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectPurchaseOrders,
  );
  items$: Observable<Array<IItemsDeclareArrival>> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectItems,
  );
  selectedItems$: Observable<Array<IItemsDeclareArrival>> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectedFilteredItems,
  );
  totalsList$: Observable<IListTotals> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectedListTotals,
  );
  selectedOrder$: Observable<IPurchaseOrderArrival> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectedOrder,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectedTabOption,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectSortList,
  );
  sort$: Observable<DropListOption> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectSort,
  );
  totalItems$: Observable<IDeclareArrivalTotals> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectTotalsItems,
  );
  selectedTotalItems$: Observable<IDeclareArrivalTotals> = this.store.select(
    declareTransitArrivalDetailsSelectors.selectTotalsSelectedItems,
  );
  validatorForGenerateButton$: Observable<boolean> = this.store.select(
    declareTransitArrivalDetailsSelectors.validatorForGenerateButton,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  items: Array<IItemsDeclareArrival>;
  lodashIsEmpty = isEmpty;
  orders: Array<IPurchaseOrderArrival>;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      declareTransitArrivalActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      declareTransitArrivalActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(declareTransitArrivalDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  handleTrackBy(index: number, item: IPurchaseOrderArrival): string {
    return item.IdOcOrdenDeCompra;
  }

  handleTrackByItem(index: number, item: IItemsDeclareArrival): string {
    return item.IdOcPartida;
  }

  noReturnPredicate(): boolean {
    return false;
  }

  dropItem(event: CdkDragDrop<IItemsDeclareTransitArrival[]>): void {
    if (this.addValidator(event.item.data)) {
      this.addItem(event.item.data.IdOcPartida);
    }
  }

  addItem(itemId: string): void {
    this.store.dispatch(declareTransitArrivalDetailsActions.SET_ITEM_DOWN({itemId}));
  }

  deleteItem(itemId: string): void {
    this.store.dispatch(declareTransitArrivalDetailsActions.DELETE_ITEM_DOWN({itemId}));
  }

  selectTab(selectedTabOption: ITabOption): void {
    if (selectedTabOption) {
      this.store.dispatch(
        declareTransitArrivalDetailsActions.SET_SELECTED_TAB_OPTION({
          selectedTabOption,
        }),
      );
    }
  }

  selectOrder(purchaseOrderId: string): void {
    if (purchaseOrderId) {
      this.store.dispatch(
        declareTransitArrivalDetailsActions.SET_SELECTED_ORDER({
          purchaseOrderId,
        }),
      );
    }
  }

  selectFilterByLetter(filterByLetter: ITabOption, node?: string): void {
    if (node === 'details') {
      this.store.dispatch(
        declareTransitArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER_DETAILS({
          filterByLetter,
        }),
      );
    } else {
      this.store.dispatch(
        declareTransitArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER({
          filterByLetter,
        }),
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(declareTransitArrivalDetailsActions.SET_SORT_SELECTED({sort}));
  }

  selectCountry(node: string, itemId: string, country: DropListOption): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_SELECTED_COUNTRY({
        node,
        itemId,
        country,
      }),
    );
  }

  selectLot(node: string, itemId: string, lot: DropListOption): void {
    this.store.dispatch(declareTransitArrivalDetailsActions.SET_SELECTED_LOT({node, itemId, lot}));
  }

  setLotName(node: string, itemId: string, lot: string): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_SELECTED_LOT_NAME({
        node,
        itemId,
        lot,
      }),
    );
  }

  selectWithoutCertificate(node: string, itemId: string, value: boolean): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_CHECK_WITHOUT_CERTIFICATE({
        node,
        itemId,
        value,
      }),
    );
  }

  setCertifiedFile(node: string, itemId: string, file: File): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_ITEM_CERTIFICATE_FILE({
        node,
        itemId,
        file,
      }),
    );
  }

  setPackingListFile(file: File): void {
    this.store.dispatch(
      declareTransitArrivalDetailsActions.SET_PACKING_LIST_FILE({
        file,
      }),
    );
  }

  addValidator(item: IItemsDeclareTransitArrival): boolean {
    return !!(
      (!isEmpty(item.selectedCountry) &&
        ((item.isPublish && item.newLot.Nombre) ||
          (!item.isPublish &&
            (!isEmpty(item.selectedLot) || item.newLot.Nombre) &&
            (item.certificate || item.withoutCertificate)))) ||
      (!item.isPublish &&
        !isEmpty(item.selectedCountry) &&
        isEmpty(item.selectedLot) &&
        !item.newLot.Nombre &&
        item.withoutCertificate)
    );
  }

  generate(): void {
    this.store.dispatch(declareTransitArrivalDetailsActions.GENERATE_LOAD());
  }
}
