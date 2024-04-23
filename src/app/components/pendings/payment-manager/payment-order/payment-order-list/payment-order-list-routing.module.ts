import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PaymentOrderListComponent} from '@appComponents/pendings/payment-manager/payment-order/payment-order-list/payment-order-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PaymentOrderListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PaymentOrderListRoutingModule {}
