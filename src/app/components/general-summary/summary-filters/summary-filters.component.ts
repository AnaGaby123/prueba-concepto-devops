import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
// Selectors
import * as selectors from '@appSelectors/general-summary/general-summary.selectors';
// Actions
import * as actions from '@appActions/general-summary/general-summary.actions';

@Component({
  selector: 'app-summary-filters',
  templateUrl: './summary-filters.component.html',
  styleUrls: ['./summary-filters.component.scss'],
})
export class SummaryFiltersComponent implements OnInit {
  @Input() isOpen = true;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  contractFilters$: Observable<Array<DropListOption>> = this.store.select(
    selectors.selectContractFilters,
  );
  contractFilter$: Observable<DropListOption> = this.store.select(selectors.selectContractFilter);
  statusFilters$: Observable<Array<DropListOption>> = this.store.select(
    selectors.selectStateFilters,
  );
  statusFilter$: Observable<DropListOption> = this.store.select(selectors.selectStateFilter);
  customerFilters$: Observable<Array<DropListOption>> = this.store.select(
    selectors.selectDropListCustomer,
  );
  customerFilter$: Observable<DropListOption> = this.store.select(selectors.selectCustomerFilter);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.SET_ALL_CLIENTS_LOAD());
  }

  onClick(): void {
    this.handleIsOpen.emit();
  }

  setContractFilter(filter: DropListOption): void {
    this.store.dispatch(actions.FILTER_CONTRACT_SELECTED({filter}));
  }

  setStatusFilter(filter: DropListOption): void {
    this.store.dispatch(actions.FILTER_STATUS_SELECTED({filter}));
  }

  setCustomerFilter(filter: DropListOption): void {
    this.store.dispatch(actions.FILTER_CUSTOMER_SELECTED({filter}));
  }

  filterCustomer(): void {
    this.store.dispatch(actions.FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD());
  }
}
