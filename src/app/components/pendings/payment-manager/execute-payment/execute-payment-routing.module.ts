import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExecutePaymentComponent} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecutePaymentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.executePayment.calendar,
            pathMatch: 'full',
          },
          {
            path: appRoutes.executePayment.calendar,
            loadChildren: () =>
              import('./execute-payment-calendar/execute-payment-calendar.module').then(
                (m) => m.ExecutePaymentCalendarModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecutePaymentRoutingModule {}
