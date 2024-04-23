import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {IDispatchOrder} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';

import {isEmpty} from 'lodash-es';
import {
  planDispatchActions,
  planDispatchDetailsActions,
} from '@appActions/pendings/imports/plan-dispatch';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dispatchOrdersList$: Observable<Array<IDispatchOrder>> = this.store.select(
    planDispatchDetailsSelectors.selectDispatchOrdersList,
  );
  dispatchOrdersStatus$: Observable<number> = this.store.select(
    planDispatchDetailsSelectors.selectDispatchOrdersStatus,
  );
  dispatchOrdersList: Array<IDispatchOrder> = [];
  lodashIsEmpty = isEmpty;

  constructor(private router: Router, private store: Store<AppState>) {}

  selectDispatchOrder(selectedDispatchOrder: IDispatchOrder): void {
    this.store.dispatch(
      planDispatchActions.SET_ALLOWED_TO_STEPS_VALUE({
        allowedToSteps: true,
      }),
    );
    this.store.dispatch(
      planDispatchDetailsActions.SET_SELECTED_DISPATCH_ORDER({
        selectedDispatchOrder,
      }),
    );
  }

  initNewDispatchOrder(): void {
    this.store.dispatch(
      planDispatchActions.SET_ALLOWED_TO_STEPS_VALUE({
        allowedToSteps: true,
      }),
    );
    this.store.dispatch(planDispatchDetailsActions.INIT_NEW_DISPATCH_ORDER());
  }

  handleTrackByItem(index: number, item: IDispatchOrder): string {
    return item.IdImpOrdenDespacho;
  }
}
