/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ExecuteCollectionDetailsComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.component';

import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecuteCollectionDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.executeCollection.paymentInformation,
            pathMatch: 'full',
          },
          {
            path: appRoutes.executeCollection.paymentInformation,
            loadChildren: () =>
              import('./payment-information/payment-information.module').then(
                (m) => m.PaymentInformationModule,
              ),
          },
          {
            path: appRoutes.executeCollection.executePayment,
            loadChildren: () =>
              import('./execute-payment/execute-payment.module').then(
                (m) => m.ExecutePaymentModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecuteCollectionDetailsRoutingModule {}
