import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
/*Actions Imports*/
import {
  registerDispatchActions,
  registerDispatchDetailsActions,
  registerDispatchListActions,
} from '@appActions/pendings/imports/register-dispatch';
/*Models Imports*/
import {ICustomBroken} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {IBarChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/*Selectors Imports*/
import {registerDispatchListSelectors} from '@appSelectors/pendings/imports/register-dispatch';

/*Utils imports */
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';
import {RegistrarDespachoGraficaTotales} from 'api-logistica';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-register-dispatch-list',
  templateUrl: './register-dispatch-list.component.html',
  styleUrls: ['./register-dispatch-list.component.scss'],
})
export class RegisterDispatchListComponent implements OnInit {
  dataBarChart$: Observable<IBarChart> = this.store.select(
    registerDispatchListSelectors.selectDataBarChart,
  );
  dataDoughnutDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    registerDispatchListSelectors.selectDataDetailsDoughnut,
  );
  dataDoughnutDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    registerDispatchListSelectors.selectDataDetailsHoverDoughnut,
  );
  isLoadingList$: Observable<boolean> = this.store.select(
    registerDispatchListSelectors.selectIsLoadingApi,
  );
  list$: Observable<Array<ICustomBroken>> = this.store.select(
    registerDispatchListSelectors.selectList,
  );
  options$: Observable<Array<DropListOption>> = this.store.select(
    registerDispatchListSelectors.selectOptions,
  );
  selectedOption$: Observable<DropListOption> = this.store.select(
    registerDispatchListSelectors.selectOption,
  );
  totals$: Observable<RegistrarDespachoGraficaTotales> = this.store.select(
    registerDispatchListSelectors.selectTotals,
  );
  totalsList$: Observable<number> = this.store.select(
    registerDispatchListSelectors.selectTotalsList,
  );
  handleSearchTerm = debounce(
    (value: string) => this.searchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  listScroll: Array<ICustomBroken> = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setCustomsBroker(true);
    this.store.dispatch(registerDispatchListActions.FETCH_TOTALS_LOAD());
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IProviderUpload> = await lastValueFrom(
      this.store.pipe(select(registerDispatchListSelectors.selectList), take(1)),
    );
    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(registerDispatchListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(registerDispatchListSelectors.selectTotalsList), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(registerDispatchListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || provider.length > currentTotal || listStatus) {
        return;
      }
      this.setCustomsBroker(false);
    }
  }

  setCustomsBroker(isFirstPage: boolean): void {
    this.store.dispatch(registerDispatchListActions.FETCH_CUSTOMS_BROKER_LOAD({isFirstPage}));
  }

  setOption(option: DropListOption): void {
    this.store.dispatch(registerDispatchListActions.SET_SELECTED_OPTION({selectedOption: option}));
  }

  setAgent(selectedCustomBroker: ICustomBroken): void {
    if (selectedCustomBroker) {
      this.store.dispatch(
        registerDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
          allowedToDetails: true,
        }),
      );
      this.store.dispatch(
        registerDispatchDetailsActions.SET_SELECTED_AGENT({
          selectedCustomBroker,
        }),
      );
    }
  }

  searchTerm(searchTerm: string): void {
    this.store.dispatch(registerDispatchListActions.SET_SEARCH_TERM({searchTerm}));
  }
}
