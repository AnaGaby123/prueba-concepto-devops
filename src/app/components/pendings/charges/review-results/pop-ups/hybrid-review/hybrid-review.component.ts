import {Component, EventEmitter, Output} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Observable} from 'rxjs';
import {IReviewInvoice} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';
import {Store} from '@ngrx/store';
/*Selectors iMPO*/
import {reviewResultsListSelectors} from '@appSelectors/pendings/charges/review-results';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {reviewResultsListActions} from '@appActions/pendings/charges/review-results';
import {Archivo} from 'api-finanzas';
import * as actionsUtils from '@appActions/utils/utils.action';
import {dateFormatISO} from '@appUtil/dates';

@Component({
  selector: 'app-hybrid-review',
  templateUrl: './hybrid-review.component.html',
  styleUrls: ['./hybrid-review.component.scss'],
})
export class HybridReviewComponent {
  @Output() eventClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  reviewCustomer$: Observable<IReviewInvoice> = this.store.select(
    reviewResultsListSelectors.selectReviewCustomer,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  width = '930px';
  height = '805px';
  tabs: Array<ITabOption> = [
    {
      id: '1',
      label: 'DATOS GENERALES',
      activeSubtitle: false,
    },
    {
      id: '2',
      label: 'REPROGRAMACIONES',
      activeSubtitle: false,
    },
  ];
  selectedTab: ITabOption = {
    id: '1',
    label: 'DATOS GENERALES',
    activeSubtitle: false,
  };

  constructor(private store: Store) {}

  setTab(tab: ITabOption): void {
    this.selectedTab = tab;
  }

  closePop(value: boolean): void {
    this.eventClose.emit(value);
  }

  setDate(date): void {
    this.store.dispatch(
      reviewResultsListActions.SET_SCHEDULE_CHARGE_DATE({
        date: dateFormatISO(date),
        dateFormat: date,
      }),
    );
  }

  download(file: Archivo): void {
    this.store.dispatch(
      actionsUtils.DOWLOAD_FILE_LOAD({
        IdArchivo: file.IdArchivo,
        FileKey: file.FileKey,
        newTab: true,
      }),
    );
  }
}
