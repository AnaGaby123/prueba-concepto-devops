import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {
  IDispatchOrder,
  IRegisterDispatchDetails,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';

// Actions
import {
  registerDispatchActions,
  registerDispatchDetailsActions,
} from '@appActions/pendings/imports/register-dispatch';

// Selectors
import {registerDispatchDetailsSelectors} from '@appSelectors/pendings/imports/register-dispatch';

// Utils
import {isEmpty} from 'lodash-es';

@Component({
  selector: 'app-register-dispatch-details',
  templateUrl: './register-dispatch-details.component.html',
  styleUrls: ['./register-dispatch-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDispatchDetailsComponent implements OnDestroy, AfterViewInit {
  detailsNode$: Observable<IRegisterDispatchDetails> = this.store.select(
    registerDispatchDetailsSelectors.selectDetails,
  );
  dispatchOrders$: Observable<Array<IDispatchOrder>> = this.store.select(
    registerDispatchDetailsSelectors.selectDispatchOrders,
  );
  actualStep$: Observable<number> = this.store.select(
    registerDispatchDetailsSelectors.selectActualStep,
  );
  totalsList$: Observable<IListTotals> = this.store.select(
    registerDispatchDetailsSelectors.selectedListTotals,
  );

  dispatchOrders: Array<IDispatchOrder>;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      registerDispatchActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      registerDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(registerDispatchDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  handleTrackBy(index: number, item: IDispatchOrder): string {
    return item.IdImpOrdenDespacho;
  }

  selectOrder(dispatchOrderId: string): void {
    if (dispatchOrderId) {
      this.store.dispatch(
        registerDispatchDetailsActions.SET_SELECTED_ORDER({
          dispatchOrderId,
        }),
      );
    }
  }
}
