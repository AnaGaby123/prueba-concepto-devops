import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ManageAdvancePaymentComponent} from '@appComponents/pendings/charges/manage-advance-payment/manage-advance-payment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ManageAdvancePaymentComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageAdvancePaymentRoutingModule {}
