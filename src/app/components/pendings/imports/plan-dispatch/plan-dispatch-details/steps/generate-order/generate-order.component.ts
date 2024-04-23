import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {IDispatchOrder} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-generate-order',
  templateUrl: './generate-order.component.html',
  styleUrls: ['./generate-order.component.scss'],
})
export class GenerateOrderComponent {
  dispatchOrder$: Observable<IDispatchOrder> = this.store.select(
    planDispatchDetailsSelectors.selectedDispatchOrder,
  );
  viewOpen = 'graphic';

  constructor(private store: Store<AppState>) {}

  handleChangeView(recreiveEvent: string): void {
    this.viewOpen = recreiveEvent;
  }
}
