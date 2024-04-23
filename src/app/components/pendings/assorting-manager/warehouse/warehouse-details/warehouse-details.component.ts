/* Angular Imports */
import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import {warehouseActions} from '@appActions/pendings/assorting-manager/warehouse';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.scss'],
})
export class WarehouseDetailsComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(warehouseActions.SET_IS_IN_DETAILS_VIEW({detailsMode: false}));
    this.store.dispatch(
      warehouseActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: false,
      }),
    );
  }
}
