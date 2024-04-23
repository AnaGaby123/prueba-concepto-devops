import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
// Selectors
import {
  preProcessingSelectors,
  preProcessOrderDetailsSelectors,
} from '@appSelectors/pre-processing';
import {preProcessDetailsActions, preProcessingActions} from '@appActions/pre-processing';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-pre-processing',
  templateUrl: './pre-processing.component.html',
  styleUrls: ['./pre-processing.component.scss'],
})
export class PreProcessingComponent implements OnDestroy {
  title$ = this.store.select(preProcessingSelectors.selectTitle);
  detailsMode$ = this.store.select(preProcessingSelectors.selectDetailsMode);
  client$: Observable<CustomerList> = this.store.select(
    preProcessOrderDetailsSelectors.selectClient,
  );

  constructor(private store: Store, private router: Router) {}

  returnMainPage(): void {
    this.store.dispatch(
      preProcessingActions.SET_DETAILS_MODE({
        detailsMode: false,
      }),
    );
    this.store.dispatch(preProcessDetailsActions.INITIAL_PREPROCESS_ORDER());
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.preProcessing.preProcess,
    ]);
  }

  ngOnDestroy() {
    this.store.dispatch(preProcessingActions.SET_INITIAL_STATE());
  }
}
