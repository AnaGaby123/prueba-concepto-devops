import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Selectors Imports */
import {uploadInvoiceListSelectors} from '@appSelectors/pendings/purchasing-manager/upload-invoice';

/* Actions Import */
import {
  uploadInvoiceActions,
  uploadInvoiceDetailsActions,
  uploadInvoiceListActions,
} from '@appActions/pendings/purchasing-manager/upload-invoice';

/* Models Imports */
import {CargarFacturaDonaTotales} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
/* Tools Imports */
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';

@Component({
  selector: 'app-upload-invoice-list',
  templateUrl: './upload-invoice-list.component.html',
  styleUrls: ['./upload-invoice-list.component.scss'],
})
export class UploadInvoiceListComponent implements OnInit {
  doughnutData$: Observable<IDoughnutChart> = this.store.select(
    uploadInvoiceListSelectors.selectDoughnutData,
  );
  doughnutDataDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    uploadInvoiceListSelectors.selectDoughnutChartDetails,
  );
  doughnutDataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    uploadInvoiceListSelectors.selectDoughnutChartDetailsHover,
  );
  isLoading$: Observable<boolean> = this.store.select(
    uploadInvoiceListSelectors.selectIsLoadingApi,
  );
  providers$: Observable<Array<IProviderUpload>> = this.store.select(
    uploadInvoiceListSelectors.selectProviders,
  );
  searchTerm$: Observable<string> = this.store.select(uploadInvoiceListSelectors.selectSearchTerm);
  sort$: Observable<DropListOption> = this.store.select(uploadInvoiceListSelectors.selectSort);
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    uploadInvoiceListSelectors.selectListSort,
  );
  totals$: Observable<CargarFacturaDonaTotales> = this.store.select(
    uploadInvoiceListSelectors.selectTotals,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  listProviderScrollItems: Array<IProviderUpload> = [];
  timer;

  constructor(private store: Store, private route: Router) {
    this.fetchProvider(true);
  }

  ngOnInit(): void {
    this.store.dispatch(uploadInvoiceListActions.FETCH_DONUT_CHART_LOAD());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(uploadInvoiceListActions.SET_SEARCH_TERM({searchTerm}));
  }

  fetchProvider(isFirstPage): void {
    this.store.dispatch(uploadInvoiceListActions.FETCH_PROVIDER_LOAD({isFirstPage}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IProviderUpload> = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceListSelectors.selectProviders), take(1)),
    );
    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceListSelectors.selectTotalProviders), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || provider.length > currentTotal || listStatus) {
        return;
      }
      this.fetchProvider(false);
    }
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(uploadInvoiceListActions.SET_SORT_SELECTED({sort}));
  }

  selectedProvider(provider: IProviderUpload) {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_CURRENT_PROVIDER({provider}));
    this.store.dispatch(uploadInvoiceActions.SET_DETAILS_MODE({detailsMode: true}));
    this.store.dispatch(uploadInvoiceActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
  }
}
