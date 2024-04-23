import {Component, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';
import {CalendarioEjecutarCobranzaDia, VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IChip} from '@appModels/chip/chip';
import {
  CALENDAR_VIEW_TYPES,
  todayDate,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.models';
import {collectionMonitoringListSelectors} from '@appSelectors/pendings/charges/collection-monitoring';
import {
  collectionMonitoringActions,
  collectionMonitoringDetailsActions,
  collectionMonitoringListActions,
} from '@appActions/pendings/charges/collection-monitoring';
import {debounce, isEmpty} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {currentDateWithoutHours} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-collection-monitoring-list',
  templateUrl: './collection-monitoring-list.component.html',
  styleUrls: ['./collection-monitoring-list.component.scss'],
})
export class CollectionMonitoringListComponent implements OnInit, OnDestroy {
  isOpen = false;

  items = [
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 50000,
      cobro: 2,
      pagoRecibido: true,
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 50000,
      cobro: 2,
      pagoRecibido: true,
      credito: false,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 50000,
      cobro: 2,
      pagoRecibido: false,
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 50000,
      cobro: 2,
      pagoRecibido: false,

      credito: false,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 500000,
      cobro: 7,
      pagoRecibido: true,
      credito: false,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      pagar: 50000,
      cobro: 3,
      pagoRecibido: false,
      credito: false,
    },
  ];

  searchTerm$: Observable<string> = this.store.select(
    collectionMonitoringListSelectors.selectSearchTerm,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    collectionMonitoringListSelectors.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    collectionMonitoringListSelectors.selectedTabOption,
  );
  optionsChip$: Observable<Array<IChip>> = this.store.select(
    collectionMonitoringListSelectors.selectChipOptions,
  );
  actualWeek$: Observable<Array<string>> = this.store.select(
    collectionMonitoringListSelectors.selectActualWeek,
  );

  clientOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringListSelectors.selectClientOptions,
  );
  clientOptionSelected$: Observable<DropListOption> = this.store.select(
    collectionMonitoringListSelectors.selectClientOption,
  );
  collectionsStatusOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringListSelectors.selectCollectionsStatusOptions,
  );
  collectionStatusSelected$: Observable<DropListOption> = this.store.select(
    collectionMonitoringListSelectors.selectCollectionsStatusOption,
  );

  typeCollectionsOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringListSelectors.selectTypeCollectionOptions,
  );

  typeCollectionsOptionsSelected$: Observable<DropListOption> = this.store.select(
    collectionMonitoringListSelectors.selectTypeCollectionOption,
  );
  typeClientsOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringListSelectors.selectTypeClientOptions,
  );
  typeClientsOptionsSelected$: Observable<DropListOption> = this.store.select(
    collectionMonitoringListSelectors.selectTypeClientOption,
  );

  daysArraysOfClients$: Observable<Array<CalendarioEjecutarCobranzaDia>> = this.store.select(
    collectionMonitoringListSelectors.selectDaysArrayOfCalendarWeek,
  );
  calendarApiStatus$: Observable<number> = this.store.select(
    collectionMonitoringListSelectors.selectCalendarApiStatus,
  );
  handleSearchTerm = debounce(
    (value: string) => this.setSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  daysArraysOfClients: Array<Array<VFacturaClienteCalendarioTotales>> = [[], [], [], [], []];
  lodashIsEmpty = isEmpty;
  currentDate: string;
  CALENDAR_VIEW_TYPES = CALENDAR_VIEW_TYPES;
  daysOfWeek: Array<string> = [
    'common.monday',
    'common.tuesday',
    'common.wednesday',
    'common.thursday',
    'common.friday',
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentDate = currentDateWithoutHours();
    this.store.dispatch(collectionMonitoringListActions.FETCH_CALENDAR_DATA_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(collectionMonitoringListActions.SET_INITIAL_STATE());
  }

  async setCurrentDate(value: string): Promise<void> {
    const currentDateFromState: Date = await lastValueFrom(
      this.store.pipe(select(collectionMonitoringListSelectors.selectCurrentDate), take(1)),
    );

    let currentDate = new Date(currentDateFromState);
    currentDate =
      value === 'next'
        ? new Date(currentDate.setDate(currentDateFromState.getDate() + 7))
        : value === 'previous'
        ? new Date(currentDate.setDate(currentDateFromState.getDate() - 7))
        : todayDate();

    this.store.dispatch(collectionMonitoringListActions.SET_CURRENT_DATE({currentDate}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(collectionMonitoringListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setSelectedTabOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_SELECTED_TAB_OPTION({
        selectedTabOption,
      }),
    );
    this.isOpen = true;
  }

  setActiveChipOption(activeChip: IChip): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_ACTIVE_CHIP({
        activeChip,
      }),
    );
  }

  setSelectedClientOption(selectedClientOption: DropListOption): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_SELECTED_CLIENT_OPTION({
        selectedClientOption,
      }),
    );
  }

  setSelectedCollectionStatusOption(selectedCollectionStatusOption: DropListOption): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_SELECTED_COLLECTION_STATUS_OPTION({
        selectedCollectionStatusOption,
      }),
    );
  }

  setSelectedTypeCollectionOption(selectedTypeCollectionOption: DropListOption): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_SELECTED_TYPE_COLLECTION_OPTION({
        selectedTypeCollectionOption,
      }),
    );
  }

  setSelectedTypeClientOption(selectedTypeClientOption: DropListOption): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_SELECTED_TYPE_CLIENT_OPTION({
        selectedTypeClientOption,
      }),
    );
  }

  selectClient(selectedClient: VFacturaClienteCalendarioTotales): void {
    this.store.dispatch(
      collectionMonitoringActions.SET_ALLOWED_TO_DETAILS({
        allowedToDetails: true,
      }),
    );
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_SELECTED_CLIENT({
        selectedClient,
      }),
    );
  }

  letterColor(pago: boolean, credito: boolean): string {
    if (pago === true && credito === true) {
      return 'green';
    }
    if ((pago === false && credito === true) || (pago === true && credito === false)) {
      return 'red';
    }
    if (pago === false && credito === false) {
      return 'yellow';
    }
  }

  handleDate(node: string, value: any): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.saveDateValue(`${node}String`, stringDate);
    this.saveDateValue(node, date);
  }

  saveDateValue(node: string, value: string | Date): void {
    this.store.dispatch(
      collectionMonitoringListActions.SET_FROM_DATE({
        node,
        value,
      }),
    );
  }

  onClick(): void {
    this.isOpen = !this.isOpen;
  }
}
