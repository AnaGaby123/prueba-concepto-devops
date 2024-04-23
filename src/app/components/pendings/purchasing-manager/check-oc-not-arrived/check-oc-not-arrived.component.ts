/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {checkOcNotArrivedSelectors} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived';

/* Actions Imports */
import {checkOcNotArrivedActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-check-oc-not-arrived',
  templateUrl: './check-oc-not-arrived.component.html',
  styleUrls: ['./check-oc-not-arrived.component.scss'],
})
export class CheckOcNotArrivedComponent {
  isInDetailsView$: Observable<boolean> = this.store.select(
    checkOcNotArrivedSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(checkOcNotArrivedSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  async goBack(): Promise<void> {
    this.store.dispatch(
      checkOcNotArrivedActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      checkOcNotArrivedActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.checkOcNotArrived.checkOcNotArrived,
    ]);
  }
}
