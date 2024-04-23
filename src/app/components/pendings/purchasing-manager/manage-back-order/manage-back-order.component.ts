import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
/*Selectors Imports*/
import {manageBackOrderSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
/*Actions Imports*/
import {
  manageBackOrderActions,
  manageBackOrderDetailsActions,
} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-manage-back-order',
  templateUrl: './manage-back-order.component.html',
  styleUrls: ['./manage-back-order.component.scss'],
})
export class ManageBackOrderComponent {
  isDetails$: Observable<boolean> = this.store.select(manageBackOrderSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(manageBackOrderSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  goBackBackOrder(event): void {
    this.store.dispatch(manageBackOrderActions.SET_IS_DETAILS({isDetails: false}));
    this.store.dispatch(manageBackOrderDetailsActions.CLEAN_ALL_STATE());
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.manageBackOrder.manageBackOrder,
      appRoutes.manageBackOrder.list,
    ]);
  }
}
