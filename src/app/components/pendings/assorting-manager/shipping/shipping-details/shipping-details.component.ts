import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  shippingActions,
  shippingDetailsActions,
} from '@appActions/pendings/assorting-manager/shipping';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
})
export class ShippingDetailsComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      shippingActions.SET_IS_IN_DETAILS_VIEW({
        detailsMode: false,
      }),
    );
    this.store.dispatch(
      shippingActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: false,
      }),
    );
    this.store.dispatch(shippingDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  setSelectedPackingList(packingListId: string): void {
    this.store.dispatch(shippingDetailsActions.SET_SELECTED_PACKING_LIST({packingListId}));
  }
}
