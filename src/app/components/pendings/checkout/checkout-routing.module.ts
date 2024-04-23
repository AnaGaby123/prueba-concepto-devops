import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CheckoutComponent} from '@appComponents/pendings/checkout/checkout.component';
import {CheckoutDetailsGuard} from '@appGuards/pendings/checkout/checkout-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.checkout.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.checkout.list,
            loadChildren: () =>
              import('./checkout-list/checkout-list.module').then((m) => m.CheckoutListModule),
          },
          {
            path: appRoutes.checkout.details,
            loadChildren: () =>
              import('./checkout-details/checkout-details.module').then(
                (m) => m.CheckoutDetailsModule,
              ),
            canLoad: [CheckoutDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
