import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {executeCollectionCalendarSelectors} from '@appSelectors/pendings/charges/execute-collection';
import {executeCollectionCalendarActions} from '@appActions/pendings/charges/execute-collection';
import {IChip} from '@appModels/chip/chip';
import {debounce} from 'lodash-es';

import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-execute-collection-calendar',
  templateUrl: './execute-collection-calendar.component.html',
  styleUrls: ['./execute-collection-calendar.component.scss'],
})
export class ExecuteCollectionCalendarComponent implements OnInit, OnDestroy {
  isOpen = false;

  searchTerm$: Observable<string> = this.store.select(
    executeCollectionCalendarSelectors.selectSearchTerm,
  );
  tabsOptions$: Observable<Array<ITabOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectTabsOptions,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    executeCollectionCalendarSelectors.selectTabSelected,
  );
  chips$: Observable<Array<IChip>> = this.store.select(
    executeCollectionCalendarSelectors.selectNewChip,
  );
  chargesOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectChargesOptions,
  );
  chargeOptionSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionCalendarSelectors.selectChargeOptionSelected,
  );
  componentShow$: Observable<string> = this.store.select(
    executeCollectionCalendarSelectors.selectWhichComponentShow,
  );
  actualWeek$: Observable<Array<string>> = this.store.select(
    executeCollectionCalendarSelectors.selectActualWeek,
  );

  clientOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectClientOptions,
  );
  clientOptionSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionCalendarSelectors.selectedClientOptions,
  );

  statusPaymentOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectPaymentStatusOptions,
  );
  statusPaymentOptionSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionCalendarSelectors.selectedPaymentStatusOption,
  );

  typePaymentOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectTypePaymentOptions,
  );
  typePaymentOptionSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionCalendarSelectors.selectedTypePaymentOptions,
  );

  typeClientOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionCalendarSelectors.selectTypeClientOptions,
  );
  typeClientOptionsSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionCalendarSelectors.selectedTypeClientOptions,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(executeCollectionCalendarActions.FETCH_COLLECTION_CALENDAR_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(executeCollectionCalendarActions.SET_INITIAL_STATE());
  }

  setOption(tabSelected: ITabOption): void {
    this.store.dispatch(executeCollectionCalendarActions.SET_TAB_OPTION_SELECTED({tabSelected}));
    this.isOpen = true;
  }

  activeChip(chipActive: IChip): void {
    this.store.dispatch(executeCollectionCalendarActions.SET_CHIP_ACTIVE({chipActive}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(executeCollectionCalendarActions.SET_SEARCH_TERM({searchTerm}));
  }

  saveInputValue(chargeOptionSelected: DropListOption): void {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_CHARGE_OPTION_SELECTED({
        chargeOptionSelected,
      }),
    );
  }

  calendar(value: string) {
    this.store.dispatch(executeCollectionCalendarActions.SET_SELECTED_WEEK({value}));
    this.store.dispatch(executeCollectionCalendarActions.FETCH_COLLECTION_CALENDAR_LOAD());
  }

  onClick(): void {
    this.isOpen = !this.isOpen;
  }

  setClient(selectedClientOption: DropListOption): void {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_SELECTED_CLIENT_OPTIONS({
        selectedClientOption,
      }),
    );
  }

  setStatusPayment(selectedPaymentStatusOption: DropListOption): void {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_SELECTED_PAYMENT_STATUS_OPTION({
        selectedPaymentStatusOption,
      }),
    );
  }

  setTypePayment(selectedTypePaymentOption: DropListOption): void {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_SELECTED_TYPE_PAYMENT_OPTIONS({
        selectedTypePaymentOption,
      }),
    );
  }

  setTypeClient(selectedTypeClientOption: DropListOption): void {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_SELECTED_TYPE_CLIENT_OPTIONS({
        selectedTypeClientOption,
      }),
    );
  }

  handleDate(node: string, value: any) {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.saveDateValue(`${node}String`, stringDate);
    this.saveDateValue(node, date);
  }

  saveDateValue(node: string, value: string | Date) {
    this.store.dispatch(
      executeCollectionCalendarActions.SET_FROM_DATE({
        node,
        value,
      }),
    );
  }
}
