/*Core imports*/
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

/*Selectors Import*/
import {processPurchaseSelectors} from '@appSelectors/pendings/purchasing-manager/process-purchase';
/*Actions Import*/
import {
  processPurchaseActions,
  processPurchaseDetailsActions,
} from '@appActions/pendings/purchasing-manager/process-purchase';

/*Util imports*/
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-process-purchase',
  templateUrl: './process-purchase.component.html',
  styleUrls: ['./process-purchase.component.scss'],
})
export class ProcessPurchaseComponent {
  isDetails$: Observable<boolean> = this.store.select(processPurchaseSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(processPurchaseSelectors.selectTitlePP);

  constructor(private store: Store, private router: Router) {}

  goBack(): void {
    this.store.dispatch(processPurchaseDetailsActions.CLEAN_DATA());
    this.store.dispatch(processPurchaseActions.SET_IS_DETAILS({isDetails: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.processPurchase.orderPurchase,
    ]);
  }
}
