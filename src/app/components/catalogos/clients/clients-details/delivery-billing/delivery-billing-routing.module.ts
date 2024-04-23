import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeliveryBillingComponent} from '@appComponents/catalogos/clients/clients-details/delivery-billing/delivery-billing.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeliveryBillingComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeliveryBillingRoutingModule {}
