import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {debounce} from 'lodash-es';

/*Selectors Imports*/
import * as selectUtils from '@appSelectors/utils/utils.selectors';
/*Models Imports*/
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBills} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
/*Actions Imports*/
import {
  attendReviewActions,
  attendReviewDetailsActions,
} from '@appActions/pendings/charges/attend-review';
import {GET_CAT_PRIORITY_LOAD} from '@appActions/catalogs/catalogos.actions';

/*Selectors Imports*/
import {
  attendViewDetailsSelectors,
  attendViewSelectors,
} from '@appSelectors/pendings/charges/attend-review';
import {Router} from '@angular/router';
import {dateFormatISO} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-attend-review-details',
  templateUrl: './attend-review-details.component.html',
  styleUrls: ['./attend-review-details.component.scss'],
})
export class AttendReviewDetailsComponent implements OnInit {
  popUpIsOpenConditions = false;
  customer$: Observable<ICustomerAttend> = this.store.select(
    attendViewDetailsSelectors.selectedClient,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    attendViewDetailsSelectors.selectFilters,
  );
  filter$: Observable<DropListOption> = this.store.select(
    attendViewDetailsSelectors.selectOptionFilter,
  );
  bills$: Observable<Array<IBills>> = this.store.select(attendViewDetailsSelectors.selectBills);
  selectedBill$: Observable<IBills> = this.store.select(attendViewDetailsSelectors.selectedBill);
  requestStatus$: Observable<number> = this.store.select(
    attendViewDetailsSelectors.selectRequestStatus,
  );
  rebillView$: Observable<boolean> = this.store.select(attendViewSelectors.selectIsInRebillView);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  billsScroller: Array<IBills> = [];
  typeOfReview;
  executed;
  date = Date;
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.typeOfReview = 'fisica';
    this.executed = true;
    this.store.dispatch(GET_CAT_PRIORITY_LOAD());
    this.store.dispatch(attendReviewActions.SET_IS_IN_REBILL_VIEW({isInRebillView: false}));
  }

  setFilter(option: DropListOption): void {
    this.store.dispatch(attendReviewDetailsActions.SET_OPTION_FILTER({option}));
  }

  selectedBill(bill: IBills): void {
    this.store.dispatch(attendReviewDetailsActions.SET_SELECTED_BILL({bill}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(attendReviewDetailsActions.SET_TERM_SEARCH({searchTerm}));
  }

  setDate(date): void {
    this.store.dispatch(
      attendReviewDetailsActions.SET_REVIEW_DATE({
        date: dateFormatISO(date),
        dateFormat: date,
      }),
    );
  }

  closePopUp(event, refPopUp: string) {
    if (refPopUp === 'conditions') {
      this.popUpIsOpenConditions = false;
    }
  }
}
