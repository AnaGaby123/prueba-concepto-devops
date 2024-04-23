import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {IReviewInvoice} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';
import {reviewResultsListSelectors} from '@appSelectors/pendings/charges/review-results';
import {reviewResultsListActions} from '@appActions/pendings/charges/review-results';
import {Archivo} from 'api-finanzas';
import * as actionsUtils from '@appActions/utils/utils.action';
import {dateFormatISO} from '@appUtil/dates';

@Component({
  selector: 'app-digital-review',
  templateUrl: './digital-review.component.html',
  styleUrls: ['./digital-review.component.scss'],
})
export class DigitalReviewComponent {
  @Output() eventClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  reviewCustomer$: Observable<IReviewInvoice> = this.store.select(
    reviewResultsListSelectors.selectReviewCustomer,
  );
  width = '930px';
  height = '805px';
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  closePop(value): void {
    this.eventClose.emit(false);
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
