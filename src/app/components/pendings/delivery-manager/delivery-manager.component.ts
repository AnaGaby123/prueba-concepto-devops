import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {assignMessengerSelectors} from '@appSelectors/pendings/delivery-manager/assign-messenger';
import {assignMessengerActions} from '@appActions/pendings/delivery-manager/assign-messenger';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-delivery-manager',
  templateUrl: './delivery-manager.component.html',
  styleUrls: ['./delivery-manager.component.scss'],
})
export class DeliveryManagerComponent {
  title$: Observable<string> = this.store.select(assignMessengerSelectors.selectTitle);
  detailsMode$: Observable<boolean> = this.store.select(
    assignMessengerSelectors.selectIsInDetailsView,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  returnMainPage(): void {
    this.store.dispatch(assignMessengerActions.SET_IS_IN_DETAILS_VIEW({detailsMode: false}));
    this.store.dispatch(assignMessengerActions.SET_ALLOWED_TO_DETAILS({allowToDetails: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.deliveryManager.deliveryManager,
      appRoutes.assignMessengerCharts.assignMessengerCharts,
    ]);
  }
}
