/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ExecutePaymentComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/execute-payment.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecutePaymentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.invoices.invoices,
            pathMatch: 'full',
          },
          {
            path: appRoutes.invoices.invoices,
            loadChildren: () => import('./invoices/invoices.module').then((m) => m.InvoicesModule),
          },
          {
            path: appRoutes.rebill.rebill,
            loadChildren: () => import('./rebill/rebill.module').then((m) => m.RebillModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecutePaymentRoutingModule {}
