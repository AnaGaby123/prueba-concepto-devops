import {Component} from '@angular/core';

import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {assignMessengerActions} from '@appActions/pendings/delivery-manager/assign-messenger';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-assign-messenger-charts',
  templateUrl: './assign-messenger-charts.component.html',
  styleUrls: ['./assign-messenger-charts.component.scss'],
})
export class AssignMessengerChartsComponent {
  constructor(private store: Store, private router: Router) {}

  redirectTo(): void {
    this.store.dispatch(assignMessengerActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
    this.store.dispatch(assignMessengerActions.SET_ALLOWED_TO_DETAILS({allowToDetails: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.deliveryManager.deliveryManager,
      appRoutes.assignMessengerCharts.details,
    ]);
  }
}
