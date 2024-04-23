import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
/*Selectors Imports*/
/*Actions Imports*/
import {reviewResultsActions} from '@appActions/pendings/charges/review-results';
import {GET_CAT_REVIEWS_LOAD} from '@appActions/catalogs/catalogos.actions';

/*Models Imports*/

@Component({
  selector: 'app-review-results',
  templateUrl: './review-results.component.html',
  styleUrls: ['./review-results.component.scss'],
})
export class ReviewResultsComponent implements OnInit {
  requestIsShow = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(reviewResultsActions.FETCH_FILTERS_LOAD());
    this.store.dispatch(GET_CAT_REVIEWS_LOAD());
  }

  handleRequest(): void {
    this.requestIsShow = !this.requestIsShow;
  }
}
