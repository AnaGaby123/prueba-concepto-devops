import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {
  IGroupArrivalList,
  IQueryResultVPDImpListaArriboPartidaDetalle,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent {
  @Output() emitChangeView: EventEmitter<string> = new EventEmitter();
  arrivalListGroup$: Observable<IGroupArrivalList> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalListGroup,
  );

  arrivalListGroups: Array<IQueryResultVPDImpListaArriboPartidaDetalle> = [];
  orderDispatch = false;

  constructor(private store: Store<AppState>) {}

  emitValue(): void {
    this.emitChangeView.emit('list');
  }

  openProviderDispatchOrder(providerName: string): void {
    this.store.dispatch(
      planDispatchDetailsActions.SET_PROVIDER_DISPATCH_ORDER_IS_OPEN({
        providerName,
      }),
    );
  }
}
