/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {PaymentInformationComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/payment-information/payment-information.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PaymentInformationComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PaymentInformationRoutingModule {}
