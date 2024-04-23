import {Component} from '@angular/core';
/*Selectors Imports*/
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {orderModificationSelectors} from '@appSelectors/pendings/order-modification';
/*Actions Imports*/
import {orderModificationActions} from '@appActions/pendings/order-modification';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-order-modification',
  templateUrl: './order-modification.component.html',
  styleUrls: ['./order-modification.component.scss'],
})
export class OrderModificationComponent {
  isDetails$: Observable<boolean> = this.store.select(orderModificationSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(orderModificationSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  redirect(): void {
    this.store.dispatch(orderModificationActions.SET_IS_DETAILS({detailsMode: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.orderModification.orderModification,
    ]);
  }
}
