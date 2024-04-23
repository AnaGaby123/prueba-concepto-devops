import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {IFollowPPromiseItem} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {IContact} from '@appModels/catalogos/contacto/contacto';

// Actions
import {
  followPPromiseActions,
  followPPromiseDetailsActions,
} from '@appActions/pendings/follow-purchase-promise';

// Selectors
import {followPPromiseDetailsSelectors} from '@appSelectors/pendings/follow-purchase-promise';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-follow-purchase-promise-details',
  templateUrl: './follow-purchase-promise-details.component.html',
  styleUrls: ['./follow-purchase-promise-details.component.scss'],
})
export class FollowPurchasePromiseDetailsComponent implements OnDestroy {
  readonly inputValidators = InputValidators;
  selectedClient$: Observable<ICustomerFPP> = this.store.select(
    followPPromiseDetailsSelectors.selectedClient,
  );
  items$: Observable<Array<IFollowPPromiseItem>> = this.store.select(
    followPPromiseDetailsSelectors.selectItemsList,
  );
  checkedItems$: Observable<Array<IFollowPPromiseItem>> = this.store.select(
    followPPromiseDetailsSelectors.checkedItems,
  );
  contact$: Observable<IContact> = this.store.select(followPPromiseDetailsSelectors.selectContact);
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    followPPromiseDetailsSelectors.selectSearchOptions,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    followPPromiseDetailsSelectors.selectedSearchOption,
  );
  searchTerm$: Observable<string> = this.store.select(
    followPPromiseDetailsSelectors.selectSearchTerm,
  );
  percentage$: Observable<number> = this.store.select(
    followPPromiseDetailsSelectors.selectPercentage,
  );
  validatorForFooter$: Observable<boolean> = this.store.select(
    followPPromiseDetailsSelectors.validatorForFooterSection,
  );
  validatorDateButton$: Observable<boolean> = this.store.select(
    followPPromiseDetailsSelectors.validatorDateButton,
  );
  promiseJustification$: Observable<string> = this.store.select(
    followPPromiseDetailsSelectors.selectJustification,
  );
  purchasePromiseDate$: Observable<Date> = this.store.select(
    followPPromiseDetailsSelectors.selectDateForPromise,
  );
  promiseCheck$: Observable<boolean> = this.store.select(
    followPPromiseDetailsSelectors.selectPromiseIsSelected,
  );
  entriesApiStatus$: Observable<number> = this.store.select(
    followPPromiseDetailsSelectors.selectApiStatus,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  selectIDArchivo$: Observable<string> = this.store.select(
    followPPromiseDetailsSelectors.selectIDArchivo,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectHeaderInternalSalesItem$: Observable<InternalSalesItem> = this.store.select(
    followPPromiseDetailsSelectors.selectHeaderInternalSalesItem,
  );
  selectInternalSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    followPPromiseDetailsSelectors.selectInternalSalesItem,
  );

  rangeStart = currentDateWithoutHoursUTCFormatDate();
  lodashIsEmpty = isEmpty;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  leftContainerIsOpen;
  alertPopIsOpen = false;
  items: Array<IFollowPPromiseItem>;

  itemsInternal: InternalSalesItem[];
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  textSearch = '';

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(followPPromiseActions.SET_ALLOWED_TO_DETAILS());
    this.store.dispatch(followPPromiseActions.SET_IS_DETAILS());
    this.store.dispatch(followPPromiseDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  handleCheck(item: IFollowPPromiseItem): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_ITEM_CHECK_BOX_VALUE({
        itemId: item.IdCotPartidaCotizacion,
      }),
    );
  }

  handleAlertPop(confirm?: boolean): void {
    this.alertPopIsOpen = !this.alertPopIsOpen;
    if (confirm) {
      this.sendToPurchaseWithoutOc();
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
    this.textSearch = searchTerm;
  }

  setSearchOption(selectedSearchOption: DropListOption): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_SELECTED_SEARCH_OPTION({
        selectedSearchOption,
      }),
    );
    if (this.textSearch !== '') {
      this.setSearchTerm(this.textSearch);
    }
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.store.dispatch(
      followPPromiseDetailsActions.SET_PURCHASE_PROMISE_DATE({
        date,
        stringDate,
      }),
    );
  }

  handleCheckPromise(value: boolean): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_PROMISE_CHECK_VALUE({
        value,
      }),
    );
  }

  setJustification(value: string): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_JUSTIFICATION_VALUE({
        justification: value,
      }),
    );
  }

  sendToPurchasePromise(): void {
    this.store.dispatch(followPPromiseDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD());
  }

  sendToPurchaseWithoutOc(): void {
    this.store.dispatch(followPPromiseDetailsActions.SEND_ENTRIES_WITHOUT_OC_LOAD());
  }

  checkAllItems(value: boolean): void {
    this.store.dispatch(
      followPPromiseDetailsActions.SET_ITEM_CHECK_BOX_VALUE({
        isCheckAllItems: value,
      }),
    );
  }

  openFile(IdArchivo): void {
    this.store.dispatch(followPPromiseDetailsActions.SET_IDARCHIVO({IdArchivo}));
  }

  fetchHistory(event: Event, item?: IFollowPPromiseItem) {
    this.store.dispatch(
      followPPromiseDetailsActions.FETCH_HISTORY_PURCHASE_PROMISE({
        idcotPromesaDeCompraPartida: item.IdCotPartidaCotizacion,
      }),
    );
  }

  handleTrackByItem(index: number, item: InternalSalesItem): string {
    return item?.data?.IdCotPartidaCotizacion;
  }

  buildContactName(names: string, firstName: string, lastName: string) {
    if (names || firstName || lastName) {
      return `${names || ''} ${firstName || ''} ${lastName || ''}`;
    } else {
      return 'N/D';
    }
  }

  globalHeaderItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxHeaderBoxNormalItem:
        this.checkAllItems(event.value as boolean);
        break;
    }
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxNormalAction:
        this.handleCheck(event.data as IFollowPPromiseItem);
        break;
      case NameActionsInternalSalesItem.ConceptSeeHistoryAction:
        this.fetchHistory(event.event, event.data as IFollowPPromiseItem);
        break;
    }
  }
}
