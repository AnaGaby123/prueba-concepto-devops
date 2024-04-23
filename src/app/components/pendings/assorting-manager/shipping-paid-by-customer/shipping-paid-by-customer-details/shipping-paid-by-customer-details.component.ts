import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  shippingPaidByCustomerActions,
  shippingPaidByCustomerDetailsActions,
} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

@Component({
  selector: 'app-shipping-paid-by-customer-details',
  templateUrl: './shipping-paid-by-customer-details.component.html',
  styleUrls: ['./shipping-paid-by-customer-details.component.scss'],
})
export class ShippingPaidByCustomerDetailsComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      shippingPaidByCustomerActions.SET_IS_IN_DETAILS_VIEW({
        detailsMode: false,
      }),
    );
    this.store.dispatch(
      shippingPaidByCustomerActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: false,
      }),
    );
    this.store.dispatch(shippingPaidByCustomerDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }
}
