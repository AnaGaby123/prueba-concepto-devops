import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {shippingActions} from '@appActions/pendings/assorting-manager/shipping';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-shipping-dashboard',
  templateUrl: './shipping-dashboard.component.html',
  styleUrls: ['./shipping-dashboard.component.scss'],
})
export class ShippingDashboardComponent {
  modal = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  handleModal(value: boolean): void {
    this.modal = value;
  }

  navigate(): void {
    this.store.dispatch(shippingActions.SET_ALLOWED_TO_DETAILS({allowToDetails: true}));
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.shipping.shipping,
        appRoutes.shipping.details,
      ])
      .then(() => {
        return this.store.dispatch(shippingActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
      });
  }
}
