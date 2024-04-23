import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IndirectPaymentComponent} from '@appComponents/pendings/payment-manager/indirect-payment/indirect-payment.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: IndirectPaymentComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class IndirectPaymentRoutingModule {}
