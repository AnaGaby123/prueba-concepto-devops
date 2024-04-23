import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as preProcessingActions from '@appActions/pre-processing';

@Component({
  selector: 'app-preprocess-order-detail',
  templateUrl: './preprocess-order-detail.component.html',
  styleUrls: ['./preprocess-order-detail.component.scss'],
})
export class PreprocessOrderDetailComponent implements OnDestroy {
  requestIsOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      preProcessingActions.preProcessingActions.SET_DETAILS_MODE({
        detailsMode: false,
      }),
    );
    this.store.dispatch(preProcessingActions.preProcessingActions.SET_INITIAL_STATE());
  }

  handleRequest(): void {
    this.requestIsOpen = !this.requestIsOpen;
  }
}
