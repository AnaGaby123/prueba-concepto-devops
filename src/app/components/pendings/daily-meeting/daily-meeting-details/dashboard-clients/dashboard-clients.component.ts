import {Component, HostListener, OnInit} from '@angular/core';
import {debounce, filter} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';
import {
  dailyMeetingDetailsActions,
  dailyMeetingDetailsDashboardActions,
} from '@appActions/pendings/daily-meeting';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {
  dailyMeetingDashboardClientsSelectors,
  dailyMeetingDetailsSelectors,
} from '@appSelectors/pendings/daily-meeting';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {take} from 'rxjs/operators';
import {IClientQuotation} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

@Component({
  selector: 'app-dashboard-clients',
  templateUrl: './dashoard-clients.component.html',
  styleUrls: ['./dashboard-clients.component.scss'],
})
export class DashboardClientsComponent implements OnInit {
  listClientsQuotations$: Observable<Array<IClientQuotation>> = this.store.select(
    dailyMeetingDetailsSelectors.selectListClientsWithQuotations,
  );
  totalQuotations$: Observable<number> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectTotalQuotations,
  );
  totalClients$: Observable<number> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectTotalClientsWithQuotations,
  );
  isLoadingClients$: Observable<number> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectIsLoadingClientsWithQuotations,
  );
  scrollItems: Array<IClientQuotation> = [];
  searchTerm$: Observable<string> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectSearchTermDashboard,
  );
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectSearchTypesDashboard,
  );
  searchTypeSelected$: Observable<DropListOption> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectSearchTypeDashboardSelected,
  );
  valuesFilter$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectValuesFilterDashboard,
  );
  valueFilterSelected$: Observable<DropListOption> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectFilterDashboardSelected,
  );
  filtersTabsIpad$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectFiltersTabIpadDashboard,
  );
  tabSelectedIpad$: Observable<DropListOption> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectTabSelectedIpadDashboard,
  );
  tabsOptionsMacBook$: Observable<Array<ITabOption>> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectTabOptionsMacBookDashboard,
  );
  tabSelectedMacBook$: Observable<ITabOption> = this.store.select(
    dailyMeetingDashboardClientsSelectors.selectTabSelectedMacBookDashboard,
  );
  clientSelected$: Observable<IClientQuotation> = this.store.select(
    dailyMeetingDetailsSelectors.selectClient,
  );
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  textSearch = '';
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  timer;

  clientSelected: IClientQuotation;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_SEARCH_TERM_DASHBOARD({searchTerm}),
    );
    this.textSearch = searchTerm;
  }

  handleSelectedClient(client: IClientQuotation): void {
    this.clientSelected = client;
    const {
      IdCliente,
      IdAjOfEstrategiaCotizacion,
      Nombre,
      ObjetivoCrecimientoFundamental,
      ObjetivoFundamentalUSD,
      Estrategia,
      TotalCotizadoUSD,
      TotalFacturadoMXN,
      TotalFacturadoUSD,
      Total,
      TotalCotizado,
      IdCotCotizacion,
      Index,
      HorasCaducidadMasReciente,
      currency,
    } = client;

    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_SELECTED_CLIENT_DASHBOARD({
        clientSelected: {
          Index,
          IdAjOfEstrategiaCotizacion,
          IdCliente,
          Nombre,
          Estrategia,
          Total,
          TotalCotizado,
          IdCotCotizacion,
          ObjetivoCrecimientoFundamental,
          ObjetivoFundamentalUSD,
          TotalCotizadoUSD,
          TotalFacturadoMXN,
          TotalFacturadoUSD,
          HorasCaducidadMasReciente,
          currency,
        },
      }),
    );
  }

  async onSelectOption(data: any, type: string): Promise<void> {
    const idSelected = type === this.viewMacBookAir ? data.id : data.value;

    const filtersTabsMacBook: Array<ITabOption> = await lastValueFrom(
      this.store.pipe(
        select(dailyMeetingDashboardClientsSelectors.selectTabOptionsMacBookDashboard),
        take(1),
      ),
    );

    const filtersTabsIpad: Array<DropListOption> = await lastValueFrom(
      this.store.pipe(
        select(dailyMeetingDashboardClientsSelectors.selectFiltersTabIpadDashboard),
        take(1),
      ),
    );

    const tabSelectedMacBook = filter(filtersTabsMacBook, (o) => o.id === idSelected)[0];
    const tabSelectedIpad = filter(filtersTabsIpad, (o) => o.value === idSelected)[0];

    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_MACBOOK({
        tabSelectedMacBook,
      }),
    );
    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_IPAD({
        tabSelectedIpad,
      }),
    );
  }

  setSearchType(searchTypeSelected: DropListOption): void {
    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_SEARCH_TYPE_DASHBOARD_SELECTED({searchTypeSelected}),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  setOptionFilter(typeFilterOptionSelected: DropListOption): void {
    this.store.dispatch(
      dailyMeetingDetailsDashboardActions.SET_TYPE_FILTER_DASHBOARD_SELECTED({
        typeFilterOptionSelected,
      }),
    );
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(dailyMeetingDetailsActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT({event}));
  }
}
