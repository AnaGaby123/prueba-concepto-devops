import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {attendReviewPaymentActions} from '@appActions/pendings/payment-manager';

@Component({
  selector: 'app-attend-review-payment-details',
  templateUrl: './attend-review-payment-details.component.html',
  styleUrls: ['./attend-review-payment-details.component.scss'],
})
export class AttendReviewPaymentDetailsComponent implements OnInit, OnDestroy {
  commentsOpen = false;

  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);

  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      attendReviewPaymentActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: true,
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      attendReviewPaymentActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(
      attendReviewPaymentActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
  }

  comments(): void {
    this.commentsOpen = !this.commentsOpen;
  }
}
