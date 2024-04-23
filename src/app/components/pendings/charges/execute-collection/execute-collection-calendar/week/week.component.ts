import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {isEmpty} from 'lodash-es';

/* Selectors Imports */
import {executeCollectionCalendarSelectors} from '@appSelectors/pendings/charges/execute-collection';

/* Models Imports */
import {CalendarioEjecutarCobranzaDia, VFacturaClienteCalendarioTotales} from 'api-finanzas';

/* Actions Imports */
import {
  executeCollectionActions,
  executeCollectionDetailsActions,
} from '@appActions/pendings/charges/execute-collection';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent {
  itemsMonday$: Observable<CalendarioEjecutarCobranzaDia> = this.store.select(
    executeCollectionCalendarSelectors.selectMondayCalendarDay,
  );
  itemsTuesday$: Observable<CalendarioEjecutarCobranzaDia> = this.store.select(
    executeCollectionCalendarSelectors.selectTuesdayCalendarDay,
  );
  itemsWednesday$: Observable<CalendarioEjecutarCobranzaDia> = this.store.select(
    executeCollectionCalendarSelectors.selectWednesdayCalendarDay,
  );
  itemsThursday$: Observable<CalendarioEjecutarCobranzaDia> = this.store.select(
    executeCollectionCalendarSelectors.selectThursDayCalendarDay,
  );
  itemsFriday$: Observable<CalendarioEjecutarCobranzaDia> = this.store.select(
    executeCollectionCalendarSelectors.selectFridayCalendarDay,
  );
  actualWeek$: Observable<Array<string>> = this.store.select(
    executeCollectionCalendarSelectors.selectActualWeek,
  );
  dayStatus$: Observable<number> = this.store.select(
    executeCollectionCalendarSelectors.selectDayStatus,
  );
  itemsMondayScroll: Array<VFacturaClienteCalendarioTotales> = [];
  itemsTuesdayScroll: Array<VFacturaClienteCalendarioTotales> = [];
  itemsWednesdayScroll: Array<VFacturaClienteCalendarioTotales> = [];
  itemsThursdayScroll: Array<VFacturaClienteCalendarioTotales> = [];
  itemsFridayScroll: Array<VFacturaClienteCalendarioTotales> = [];

  lodashIsEmpty = isEmpty;
  currentDate = (): string => {
    let today = new Date().toISOString();
    const date = today.split('T');
    today = new Date(date[0]).toISOString();
    return today;
  };

  constructor(private store: Store<AppState>) {}

  selectedItem(client: VFacturaClienteCalendarioTotales): void {
    this.store.dispatch(
      executeCollectionActions.SET_ALLOWED_TO_DETAILS({
        allowedToDetails: true,
      }),
    );
    this.store.dispatch(
      executeCollectionDetailsActions.SET_SELECTED_CLIENT({
        selectedClient: client,
      }),
    );
  }
}
