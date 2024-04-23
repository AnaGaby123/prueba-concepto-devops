import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingPaidByCustomerDetailsComponent} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: appRoutes.empty, component: ShippingPaidByCustomerDetailsComponent},
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingPaidByCustomerDetailsRoutingModule {}
