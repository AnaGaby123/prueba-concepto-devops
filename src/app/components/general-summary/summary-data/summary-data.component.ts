import {Component} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {select, Store} from '@ngrx/store';
// Selectors
import * as selectors from '@appSelectors/general-summary/general-summary.selectors';
import {selectCurrentPage} from '@appSelectors/general-summary/general-summary.selectors';
// Actions
import * as actions from '@appActions/general-summary/general-summary.actions';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {ICustomerSummary} from '@appModels/store/general-summary/general-summary.models';
import {take} from 'rxjs/operators';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-summary-data',
  templateUrl: './summary-data.component.html',
  styleUrls: ['./summary-data.component.scss'],
})
export class SummaryDataComponent {
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(selectors.selectTabOptions);
  tabOption$: Observable<ITabOption> = this.store.select(selectors.selectTabOption);
  listCustomer$: Observable<ICustomerSummary[]> = this.store.select(selectors.selectListCustomer);
  totalCustomer$: Observable<number> = this.store.select(selectors.selectTotalCustomer);
  apiStatus$: Observable<boolean> = this.store.select(selectors.selectStatusApi);
  scrollItems: Array<ICustomerSummary> = [];
  timer;

  constructor(private store: Store<AppState>) {}

  setOption(option: ITabOption): void {
    this.store.dispatch(actions.OPTION_EVI_SELECTED({option}));
    this.getCustomer(true);
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const customers: any[] = await lastValueFrom(
      this.store.pipe(select(selectors.selectListCustomer), take(1)),
    );
    if (event.endIndex !== customers.length - 1) {
      return;
    }
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(selectors.selectTotalCustomer), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || customers.length > currentTotal) {
        return;
      }

      this.fetchNextChunk().then(() => {});
    }
  }

  fetchNextChunk(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.getCustomer(false);
        resolve([]);
      }, 200);
    });
  }

  getCustomer(isFirstPage: boolean): void {
    this.store.dispatch(actions.FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD());
  }

  viewStrategy(customer: ICustomerSummary): void {
    this.store.dispatch(actions.FETCH_STRATEGIES_LOAD({customer}));
  }
}
