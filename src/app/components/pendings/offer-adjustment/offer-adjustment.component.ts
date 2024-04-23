/* Core Container */
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {offerAdjustmentSelectors} from '@appSelectors/pendings';

/* Actions Imports */
/* Route Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-offer-adjustment',
  templateUrl: './offer-adjustment.component.html',
  styleUrls: ['./offer-adjustment.component.scss'],
})
export class OfferAdjustmentComponent {
  detailsMode$: Observable<boolean> = this.store.select(offerAdjustmentSelectors.selectDetailsMode);
  title$: Observable<string> = this.store.select(offerAdjustmentSelectors.selectTitle);

  constructor(private store: Store<AppState>, private router: Router) {}

  returnMainPage() {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.offerAdjustment.offerAdjustment,
    ]);
  }
}
