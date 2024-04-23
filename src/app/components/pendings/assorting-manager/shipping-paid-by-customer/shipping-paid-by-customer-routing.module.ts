import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingPaidByCustomerComponent} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ShippingPaidByCustomerComponent,
        children: [
          {
            path: appRoutes.empty,
            pathMatch: 'full',
            redirectTo: appRoutes.shipping.paidByCustomerList,
          },
          {
            path: appRoutes.shipping.paidByCustomerList,
            loadChildren: () =>
              import('./shipping-paid-by-customer-list/shipping-paid-by-customer-list.module').then(
                (m) => m.ShippingPaidByCustomerListModule,
              ),
          },
          {
            path: appRoutes.shipping.paidByCustomerDetails,
            loadChildren: () =>
              import(
                './shipping-paid-by-customer-details/shipping-paid-by-customer-details.module'
              ).then((m) => m.ShippingPaidByCustomerDetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingPaidByCustomerRoutingModule {}
