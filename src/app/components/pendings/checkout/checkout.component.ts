import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {checkoutSelectors} from '@appSelectors/pendings';
import {checkoutActions, checkoutDetailsActions} from '@appActions/pendings/checkout';
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(checkoutSelectors.selectTitle);
  isInDetailsView$: Observable<boolean> = this.store.select(checkoutSelectors.selectDetailsMode);
  resumeMode$: Observable<boolean> = this.store.select(checkoutDetailsSelectors.selectResumeMode);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnDestroy(): void {
    this.store.dispatch(checkoutActions.CLEAN_ALL_CHECKOUT());
  }

  async returnMainPage(): Promise<void> {
    this.store.dispatch(checkoutDetailsActions.DESTROY_COMPONENT());

    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.checkout.checkout,
    ]);
  }
}
