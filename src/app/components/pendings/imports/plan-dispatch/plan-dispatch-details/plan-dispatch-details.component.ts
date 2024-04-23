import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

@Component({
  selector: 'app-plan-dispatch-details',
  templateUrl: './plan-dispatch-details.component.html',
  styleUrls: ['./plan-dispatch-details.component.scss'],
})
export class PlanDispatchDetailsComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(planDispatchDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }
}
