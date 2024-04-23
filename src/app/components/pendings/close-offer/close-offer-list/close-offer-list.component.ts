/*Core imports */
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

// Models imports
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {IFilterDate} from '@appModels/filters/Filters';
import {ISearchOptions} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Actions imports
import * as closeOfferActions from '@appActions/pendings/close-offer/close-offer.actions';
import * as closeOfferListActions from '@appActions/pendings/close-offer/close-offer-list/close-offer-list.actions';

// Selectors imports
import * as closeOfferListSelectors from '@appSelectors/pendings/close-offer/close-offer-list/close-offer-list.selectors';

// Utils imports
import {debounce} from 'lodash-es';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {closeOfferListSelector} from '@appSelectors/pendings/close-offer';
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-close-offer-list',
  templateUrl: './close-offer-list.component.html',
  styleUrls: ['./close-offer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseOfferListComponent implements OnInit {
  // TODO: Cambiar pot selectFilteredTabOptions cuando las graficas esten llenas
  barChart$: Observable<IBarChart> = this.store.select(closeOfferListSelectors.selectDataBarChart);
  burgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferListSelectors.selectBurgerOptions,
  );
  clients$: Observable<Array<ClientsListItemForCloseOffer>> = this.store.select(
    closeOfferListSelectors.selectMappedClientList,
  );
  searchTerm$: Observable<string> = this.store.select(closeOfferListSelectors.selectSearchTerm);
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    closeOfferListSelectors.selectDataDonutChart,
  );
  doughnutCharDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    closeOfferListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    closeOfferListSelectors.selectDataDonutOptionDetailHover,
  );
  selectedBurgerOption$: Observable<DropListOption> = this.store.select(
    closeOfferListSelectors.selectedBurgerOption,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    closeOfferListSelectors.selectedTabOption,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    closeOfferListSelectors.selectTabOptions,
  );
  totalsOfClients$: Observable<number> = this.store.select(
    closeOfferListSelector.selectTotalsOfClients,
  );
  totalQuotations$: Observable<number> = this.store.select(
    closeOfferListSelector.selectTotalQuotations,
  );
  searchTypeOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferListSelectors.selectSearchTypeOptions,
  );
  selectedSearchTypeOption$: Observable<DropListOption> = this.store.select(
    closeOfferListSelectors.selectedSearchTypeOption,
  );
  apiStatus$: Observable<number> = this.store.select(
    closeOfferListSelectors.clientListRequestStatus,
  );
  clientList: Array<ClientsListItemForCloseOffer>;
  handleOCSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  timer;
  textSearch = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(closeOfferListActions.INIT_CLOSE_OFFER());
  }
  setBurgerOption(selectedBurgerOption: DropListOption): void {
    if (selectedBurgerOption) {
      this.store.dispatch(
        closeOfferListActions.SET_BURGER_OPTION_SELECTED({
          selectedBurgerOption,
        }),
      );
    }
  }

  selectedClient(client: ClientsListItemForCloseOffer): void {
    this.store.dispatch(
      closeOfferActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: true,
      }),
    );
    this.store.dispatch(closeOfferDetailsActions.SET_CLIENT_SELECTED_LOAD({client}));
  }

  setDateRange(dateRange: IFilterDate): void {
    this.store.dispatch(
      closeOfferListActions.SET_DATE_RANGE_SELECTED({
        dateRange: dateRange
          ? {
              startDate: currentDateWithoutHoursUTCFormatDate(dateRange.startDate),
              endDate: currentDateWithoutHoursUTCFormatDate(dateRange.endDate),
            }
          : null,
      }),
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(closeOfferListActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  setTabOptionSelected(selectedTabOption: ITabOption): void {
    if (selectedTabOption) {
      this.store.dispatch(closeOfferListActions.SET_TAB_OPTION_SELECTED({selectedTabOption}));
    }
  }

  setSearchType(searchType: DropListOption) {
    this.store.dispatch(closeOfferListActions.SET_SELECTED_SEARCH_TYPE({searchType}));
    if (this.textSearch !== '') {
      this.setSearchTerm(this.textSearch);
    }
  }
}
