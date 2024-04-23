import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {InvoicesComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/invoices/invoices.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InvoicesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
