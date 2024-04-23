/* Core Imports */
import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Actions Imports */
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
} from '@appActions/pendings/offer-adjustment';

/* Selectors Imports */
import {
  adjustmentDetailsDetailsSelectors,
  adjustmentDetailsSelectors,
} from '@appSelectors/pendings/offer-adjustment';

/* Tools Imports */
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';
import {debounce} from 'lodash-es';

import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IClientAdjustmentOffer} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  userName$: Observable<string> = this.store.select(
    adjustmentDetailsSelectors.selectNameUserSelected,
  );
  filtersTabs$: Observable<Array<ITabOption>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectFiltersTab,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectTabSelected,
  );
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectSearchTypes,
  );
  searchTypeSelected$: Observable<DropListOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectSearchTypeSelected,
  );
  valuesFilter$: Observable<Array<DropListOption>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectValuesFilter,
  );
  valueFilterSelected$: Observable<DropListOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectFilterSelected,
  );
  isLoadingClients$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectIsLoadingClients,
  );
  isLoadingMoreClients$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectIsLoadingMoreClients,
  );
  listClients$: Observable<Array<IClientAdjustmentOffer>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectListClients,
  );
  totalClients$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectTotalClients,
  );
  totalQuotations$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectTotalQuotations,
  );
  clientSelected$: Observable<IClientAdjustmentOffer> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectClientSelected,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';
  scrollItems: Array<IClientAdjustmentOffer> = [];
  viewType: string;
  timer;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.fetchClients(true);
  }

  fetchClients(isFirstPage: boolean): void {
    this.store.dispatch(offerAdjustmentDetailsActions.FETCH_CLIENTS({isFirstPage}));
  }

  onSelectOption(tabSelected: ITabOption): void {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_TAB({tabSelected}));
  }

  setSearchType(typeSelected: DropListOption): void {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_TYPE_SELECTED({typeSelected}));
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  selectedPurchase(clientSelected: IClientAdjustmentOffer) {
    this.store.dispatch(
      offerAdjustmentDetailsActions.SET_CLIENT_SELECTED({
        clientSelected,
        idClient: clientSelected.IdCliente,
        idAjOfQuotationStrategy: clientSelected.IdAjOfEstrategiaCotizacion,
      }),
    );
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({popUpCode: false}),
    );
  }

  async selectFilterByType(valueFilterSelected: DropListOption): Promise<void> {
    const isLoading: boolean = await lastValueFrom(
      this.store.pipe(select(adjustmentDetailsDetailsSelectors.selectIsLoadingClients), take(1)),
    );

    if (!isLoading) {
      this.store.dispatch(
        offerAdjustmentDetailsActions.SET_VALUE_FILTER_SELECTED({
          valueFilterSelected,
        }),
      );
    }
  }

  async fetchMore(event: IPageInfo) {
    const clients: any[] = await lastValueFrom(
      this.store.pipe(select(adjustmentDetailsDetailsSelectors.selectListClients), take(1)),
    );

    if (event.endIndex !== clients.length - 1) {
      return;
    }

    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(adjustmentDetailsDetailsSelectors.selectTotalClients), take(1)),
    );

    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(adjustmentDetailsDetailsSelectors.selectCurrentPage), take(1)),
    );

    const isLoading: boolean = await lastValueFrom(
      this.store.pipe(select(adjustmentDetailsDetailsSelectors.selectIsLoadingClients), take(1)),
    );

    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (
        currentPage > totalPages ||
        clients.length > currentTotal ||
        isLoading ||
        clients.length === 0
      ) {
        return;
      }

      this.fetchNextChunk().then(() => {
        // TODO: Descomentar cuando ya se consuma el servicio
        this.store.dispatch(
          offerAdjustmentDetailsActions.SET_IS_LOADING_MORE_CLIENTS({
            isLoadingMoreClients: true,
          }),
        );
      });
    }
  }

  fetchNextChunk(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.fetchClients(false);
        resolve([]);
      }, 200);
    });
  }
}
