import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
/*Selectors Imports*/
import {manageBackOrderListSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
/*Actions Imports*/
import {
  manageBackOrderActions,
  manageBackOrderDetailsActions,
  manageBackOrderListActions,
} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {DatosGraficaOrdenDeCompraProveedorObj} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-manage-back-order-list',
  templateUrl: './manage-back-order-list.component.html',
  styleUrls: ['./manage-back-order-list.component.scss'],
})
export class ManageBackOrderListComponent implements OnInit {
  dataDetailsHoverProvider$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    manageBackOrderListSelectors.selectChartDataDetailsHoverProvider,
  );
  dataDetailsProvider$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    manageBackOrderListSelectors.selectChartDataDetailsProvider,
  );
  dataMonitoring$: Observable<IDoughnutChart> = this.store.select(
    manageBackOrderListSelectors.selectDonutChartDataDelivery,
  );
  dataMonitoringDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    manageBackOrderListSelectors.selectDonutChartDeliveryDetails,
  );
  dataMonitoringDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    manageBackOrderListSelectors.selectDonutChartDeliveryDetailsHover,
  );
  dataProvider$: Observable<IDoughnutChart> = this.store.select(
    manageBackOrderListSelectors.selectChartDataProvider,
  );
  donutStatus$: Observable<number> = this.store.select(
    manageBackOrderListSelectors.selectDonutStatus,
  );
  isLoadingProviders$: Observable<boolean> = this.store.select(
    manageBackOrderListSelectors.selectIsLoadingApi,
  );
  providers$: Observable<Array<IProvider>> = this.store.select(
    manageBackOrderListSelectors.selectProviders,
  );
  searchTerm$: Observable<string> = this.store.select(
    manageBackOrderListSelectors.selectSearchTerm,
  );
  sort$: Observable<DropListOption> = this.store.select(
    manageBackOrderListSelectors.selectSortSelected,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    manageBackOrderListSelectors.selectSortList,
  );
  totals$: Observable<DatosGraficaOrdenDeCompraProveedorObj> = this.store.select(
    manageBackOrderListSelectors.totalsProvider,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    manageBackOrderListSelectors.selectTypeSearch,
  );
  typeOptionsSearch$: Observable<Array<DropListOption>> = this.store.select(
    manageBackOrderListSelectors.selectOptionsSearch,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  providersScroll: Array<IProvider> = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(manageBackOrderListActions.FETCH_DONUT_PROVIDERS_LOAD());
    this.store.dispatch(manageBackOrderListActions.FETCH_DONUT_MONITORING_LOAD());
    this.fetchProviders(true);
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(manageBackOrderListActions.SET_TERM_SEARCH({searchTerm}));
  }

  fetchProviders(isFirstPage: boolean): void {
    this.store.dispatch(manageBackOrderListActions.FETCH_PROVIDERS_LOAD({isFirstPage}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IProviderUpload> = await lastValueFrom(
      this.store.pipe(select(manageBackOrderListSelectors.selectProviders), take(1)),
    );
    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(manageBackOrderListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(manageBackOrderListSelectors.selectTotalProviders), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(manageBackOrderListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || provider.length > currentTotal || listStatus) {
        return;
      }
      this.fetchProviders(false);
    }
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(manageBackOrderListActions.SET_SORT_OPTION({sort}));
  }

  setTypeOfSearch(typeOfSearch: DropListOption): void {
    this.store.dispatch(manageBackOrderListActions.SET_TYPE_SEARCH({typeOfSearch}));
  }

  selectedProvider(provider: IProvider): void {
    this.store.dispatch(manageBackOrderActions.SET_IS_DETAILS({isDetails: true}));
    this.store.dispatch(manageBackOrderDetailsActions.SET_PROVIDER_SELECTED({provider}));
  }
}
