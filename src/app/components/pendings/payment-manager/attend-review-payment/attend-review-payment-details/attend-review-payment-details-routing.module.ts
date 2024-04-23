import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewPaymentDetailsComponent} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendReviewPaymentDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendReviewPaymentDetailsRoutingModule {}
