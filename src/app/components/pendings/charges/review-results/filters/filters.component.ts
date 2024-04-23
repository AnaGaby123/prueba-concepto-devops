import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {reviewResultsSelectors} from '@appSelectors/pendings/charges/review-results';
import {reviewResultsActions} from '@appActions/pendings/charges/review-results';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() isShow = true;
  @Output() handleIsShow: EventEmitter<void> = new EventEmitter<void>();
  dropReviews$: Observable<Array<DropListOption>> = this.store.select(
    reviewResultsSelectors.selectDropReviews,
  );
  dropCustomer$: Observable<Array<DropListOption>> = this.store.select(
    reviewResultsSelectors.selectDropCustomer,
  );
  dropMessenger$: Observable<Array<DropListOption>> = this.store.select(
    reviewResultsSelectors.selectDropMessenger,
  );
  selectedReview$: Observable<DropListOption> = this.store.select(
    reviewResultsSelectors.selectReview,
  );
  selectedCustomer$: Observable<DropListOption> = this.store.select(
    reviewResultsSelectors.selectCustomer,
  );
  selectedMessenger$: Observable<DropListOption> = this.store.select(
    reviewResultsSelectors.selectMessenger,
  );

  constructor(private store: Store) {}

  showFilters(): void {
    this.handleIsShow.emit();
  }

  filter(): void {
    this.store.dispatch(reviewResultsActions.EXECUTE_FILTERS());
  }

  setItemFilter(item: DropListOption, attribute: string): void {
    if (item) {
      this.store.dispatch(reviewResultsActions.SET_FILTER({item, attribute}));
    }
  }
}
