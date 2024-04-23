import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PaymentOrderComponent} from '@appComponents/pendings/payment-manager/payment-order/payment-order.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PaymentOrderComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.paymentOrder.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.paymentOrder.list,
            loadChildren: () =>
              import('./payment-order-list/payment-order-list.module').then(
                (m) => m.PaymentOrderListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PaymentOrderRoutingModule {}
