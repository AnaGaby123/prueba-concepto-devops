import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
// Actions
import {
  FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD,
  FETCH_EVI_LIST_LOAD,
} from '@appActions/general-summary/general-summary.actions';

@Component({
  selector: 'app-general-summary',
  templateUrl: './general-summary.component.html',
  styleUrls: ['./general-summary.component.scss'],
})
export class GeneralSummaryComponent implements OnInit {
  requestIsOpen = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FETCH_EVI_LIST_LOAD());
    this.store.dispatch(FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD());
  }

  handleRequest(): void {
    this.requestIsOpen = !this.requestIsOpen;
  }
}
