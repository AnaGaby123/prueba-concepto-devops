import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewPaymentComponent} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendReviewPaymentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.attendReviewPayment.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.attendReviewPayment.list,
            loadChildren: () =>
              import('./attend-review-payment-list/attend-review-payment-list.module').then(
                (m) => m.AttendReviewPaymentListModule,
              ),
          },
          {
            path: appRoutes.attendReviewPayment.details,
            loadChildren: () =>
              import('./attend-review-payment-details/attend-review-payment-details.module').then(
                (m) => m.AttendReviewPaymentDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendReviewPaymentRoutingModule {}
