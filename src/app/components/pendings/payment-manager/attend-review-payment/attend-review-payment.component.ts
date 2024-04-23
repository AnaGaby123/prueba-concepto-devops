/*Core imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

/*Selectors imports */
import {attendReviewPaymentSelectors} from '@appSelectors/pendings/payment-manager';

/*Util imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-attend-review-payment',
  templateUrl: './attend-review-payment.component.html',
  styleUrls: ['./attend-review-payment.component.scss'],
})
export class AttendReviewPaymentComponent {
  isDetails$: Observable<boolean> = this.store.select(
    attendReviewPaymentSelectors.selectIsInDetailsView,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  redirect(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.attendReviewPayment.attendReviewPayment,
      appRoutes.attendReviewPayment.list,
    ]);
  }
}
