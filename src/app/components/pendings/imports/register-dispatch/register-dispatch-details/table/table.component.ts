import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {registerDispatchDetailsActions} from '@appActions/pendings/imports/register-dispatch';
import {Observable} from 'rxjs';

// Models
import {
  IDispatchOrder,
  IItemsDispatchOrder,
  IItemsTotals,
  IRegisterDispatchDetails,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';

// Selectors
import {registerDispatchDetailsSelectors} from '@appSelectors/pendings/imports/register-dispatch';

// Utils
import {isEmpty} from 'lodash-es';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  dispatchOrder$: Observable<IDispatchOrder> = this.store.select(
    registerDispatchDetailsSelectors.selectedDispatchOrder,
  );
  items$: Observable<Array<IItemsDispatchOrder>> = this.store.select(
    registerDispatchDetailsSelectors.selectItems,
  );
  detailsNode$: Observable<IRegisterDispatchDetails> = this.store.select(
    registerDispatchDetailsSelectors.selectDetails,
  );
  providersTotalsList$: Observable<IItemsTotals> = this.store.select(
    registerDispatchDetailsSelectors.selectedProvidersListTotals,
  );
  items: Array<IItemsDispatchOrder> = [];
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  handleTrackByItem(index: number, item: IItemsDispatchOrder): string {
    return item.IdImpOrdenDespacho;
  }

  register(): void {
    this.store.dispatch(registerDispatchDetailsActions.SET_ACTUAL_STEP({actualStep: 2}));
  }
}
