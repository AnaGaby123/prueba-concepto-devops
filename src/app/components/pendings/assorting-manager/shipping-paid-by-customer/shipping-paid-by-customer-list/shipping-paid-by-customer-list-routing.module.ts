import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingPaidByCustomerListComponent} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: appRoutes.empty, component: ShippingPaidByCustomerListComponent},
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingPaidByCustomerListRoutingModule {}
