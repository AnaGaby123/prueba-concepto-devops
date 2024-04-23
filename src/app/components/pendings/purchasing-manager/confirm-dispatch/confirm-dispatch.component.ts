/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {confirmDispatchSelectors} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch';

/* Actions Imports */
import {confirmDispatchActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-confirm-dispatch',
  templateUrl: './confirm-dispatch.component.html',
  styleUrls: ['./confirm-dispatch.component.scss'],
})
export class ConfirmDispatchComponent {
  isInDetailsView$: Observable<boolean> = this.store.select(
    confirmDispatchSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(confirmDispatchSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  async goBack(): Promise<void> {
    this.store.dispatch(
      confirmDispatchActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      confirmDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.confirmDispatch.confirmDispatch,
    ]);
  }
}
