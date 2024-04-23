import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';

// Actions
import {
  shippingPaidByCustomerActions,
  shippingPaidByCustomerDetailsActions,
} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

// Selectors
import {shippingPaidByCustomerSelectors} from '@appSelectors/pendings/assorting-manager/shipping-paid-by-customer';

@Component({
  selector: 'app-shipping-paid-by-customer',
  templateUrl: './shipping-paid-by-customer.component.html',
  styleUrls: ['./shipping-paid-by-customer.component.scss'],
})
export class ShippingPaidByCustomerComponent {
  title$: Observable<string> = this.store.select(shippingPaidByCustomerSelectors.selectTitle);
  isInDetails$: Observable<boolean> = this.store.select(
    shippingPaidByCustomerSelectors.selectIsDetails,
  );

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.store.dispatch(shippingPaidByCustomerDetailsActions.CLEAN_ALL_DETAILS_STATE());
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
    this.location.back();
  }
}
