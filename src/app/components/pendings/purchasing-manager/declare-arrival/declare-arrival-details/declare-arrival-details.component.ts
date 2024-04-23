import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {
  IDeclareArrivalDetails,
  IDeclareArrivalTotals,
  IItemsDeclareArrival,
  IPurchaseOrderArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';

// Actions
import {
  declareArrivalActions,
  declareArrivalDetailsActions,
} from '@appActions/pendings/purchasing-manager/declare-arrival';

// Selectors
import {declareArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-declare-arrival-details',
  templateUrl: './declare-arrival-details.component.html',
  styleUrls: ['./declare-arrival-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclareArrivalDetailsComponent implements OnDestroy, AfterViewInit {
  provider$: Observable<IProvider> = this.store.select(
    declareArrivalDetailsSelectors.selectProvider,
  );
  detailsNode$: Observable<IDeclareArrivalDetails> = this.store.select(
    declareArrivalDetailsSelectors.selectDetails,
  );
  orders$: Observable<Array<IPurchaseOrderArrival>> = this.store.select(
    declareArrivalDetailsSelectors.selectPurchaseOrders,
  );
  items$: Observable<Array<IItemsDeclareArrival>> = this.store.select(
    declareArrivalDetailsSelectors.selectItems,
  );
  selectedItems$: Observable<Array<IItemsDeclareArrival>> = this.store.select(
    declareArrivalDetailsSelectors.selectedFilteredItems,
  );
  totalsList$: Observable<IListTotals> = this.store.select(
    declareArrivalDetailsSelectors.selectedListTotals,
  );
  selectedOrder$: Observable<IPurchaseOrderArrival> = this.store.select(
    declareArrivalDetailsSelectors.selectedOrder,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    declareArrivalDetailsSelectors.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    declareArrivalDetailsSelectors.selectedTabOption,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    declareArrivalDetailsSelectors.selectSortList,
  );
  sort$: Observable<DropListOption> = this.store.select(declareArrivalDetailsSelectors.selectSort);
  totalItems$: Observable<IDeclareArrivalTotals> = this.store.select(
    declareArrivalDetailsSelectors.selectTotalsItems,
  );
  selectedTotalItems$: Observable<IDeclareArrivalTotals> = this.store.select(
    declareArrivalDetailsSelectors.selectTotalsSelectedItems,
  );
  validatorForGenerateButton$: Observable<boolean> = this.store.select(
    declareArrivalDetailsSelectors.validatorForGenerateButton,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    declareArrivalDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    declareArrivalDetailsSelectors.selectContactsProviderDropList,
  );
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
      declareArrivalActions.SET_IS_DETAILS({
        detailsMode: false,
      }),
    );
    this.store.dispatch(
      declareArrivalActions.SET_ALLOW_TO_DETAILS({
        allowToDetails: false,
      }),
    );
    this.store.dispatch(declareArrivalDetailsActions.CLEAN_ALL_DETAILS_STATE());
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

  dropItem(event: CdkDragDrop<IItemsDeclareArrival[]>): void {
    if (this.addValidator(event.item.data)) {
      this.addItem(event.item.data.IdOcPartida);
    }
  }

  addItem(itemId: string): void {
    this.store.dispatch(declareArrivalDetailsActions.SET_ITEM_DOWN({itemId}));
  }

  deleteItem(itemId: string): void {
    this.store.dispatch(declareArrivalDetailsActions.DELETE_ITEM_DOWN({itemId}));
  }

  selectTab(selectedTabOption: ITabOption): void {
    if (selectedTabOption) {
      this.store.dispatch(
        declareArrivalDetailsActions.SET_SELECTED_TAB_OPTION({
          selectedTabOption,
        }),
      );
    }
  }

  selectOrder(purchaseOrderId: string): void {
    if (purchaseOrderId) {
      this.store.dispatch(
        declareArrivalDetailsActions.SET_SELECTED_ORDER({
          purchaseOrderId,
        }),
      );
    }
  }

  selectFilterByLetter(filterByLetter: ITabOption, node?: string): void {
    if (node === 'details') {
      this.store.dispatch(
        declareArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER_DETAILS({
          filterByLetter,
        }),
      );
    } else {
      this.store.dispatch(
        declareArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER({
          filterByLetter,
        }),
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(declareArrivalDetailsActions.SET_SORT_SELECTED({sort}));
  }

  selectCountry(node: string, itemId: string, country: DropListOption): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_SELECTED_COUNTRY({
        node,
        itemId,
        country,
      }),
    );
  }

  selectLot(node: string, itemId: string, lot: DropListOption): void {
    this.store.dispatch(declareArrivalDetailsActions.SET_SELECTED_LOT({node, itemId, lot}));
  }

  setLotName(node: string, itemId: string, lot: string): void {
    this.store.dispatch(declareArrivalDetailsActions.SET_SELECTED_LOT_NAME({node, itemId, lot}));
  }

  selectWithoutCertificate(node: string, itemId: string, value: boolean): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_CHECK_WITHOUT_CERTIFICATE({
        node,
        itemId,
        value,
      }),
    );
  }

  setCertifiedFile(node: string, itemId: string, file: File): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_ITEM_CERTIFICATE_FILE({
        node,
        itemId,
        file,
      }),
    );
  }

  setPackingListFile(file: File): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_PACKING_LIST_FILE({
        file,
      }),
    );
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }

  addValidator(item: IItemsDeclareArrival): boolean {
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
    this.store.dispatch(declareArrivalDetailsActions.GENERATE_LOAD());
  }
}
