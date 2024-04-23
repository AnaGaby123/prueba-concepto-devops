import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewPaymentListComponent} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendReviewPaymentListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendReviewPaymentListRoutingModule {}
