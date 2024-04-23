import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/*Actions Imports*/
import {Router} from '@angular/router';
import {purchasePromiseActions} from '@appActions/pendings/purchase-promise';

/*Selectors imports*/
import {purchasePromiseSelectors} from '@appSelectors/pendings';

/*Utils*/
import {appRoutes} from '@appHelpers/core/app-routes';

const selectors = purchasePromiseSelectors.purchasePromiseSelectors;

@Component({
  selector: 'app-purchase-promise',
  templateUrl: './purchase-promise.component.html',
  styleUrls: ['./purchase-promise.component.scss'],
})
export class PurchasePromiseComponent {
  isDetails$: Observable<boolean> = this.store.select(selectors.selectIsDetails);
  title$: Observable<string> = this.store.select(selectors.selectTitle);

  constructor(private store: Store<AppState>, private router: Router) {}

  redirect(): void {
    this.store.dispatch(purchasePromiseActions.SET_IS_DETAILS({isDetails: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.purchasePromise.purchasePromise,
    ]);
  }
}
