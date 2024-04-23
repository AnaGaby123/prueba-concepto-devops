import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingComponent} from '@appComponents/pendings/assorting-manager/shipping/shipping.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ShippingComponent,
        children: [
          {
            path: appRoutes.empty,
            pathMatch: 'full',
            redirectTo: appRoutes.shipping.dashboard,
          },
          {
            path: appRoutes.shipping.dashboard,
            loadChildren: () =>
              import('./shipping-dashboard/shipping-dashboard.module').then(
                (m) => m.ShippingDashboardModule,
              ),
          },
          {
            path: appRoutes.shipping.details,
            loadChildren: () =>
              import('./shipping-details/shipping-details.module').then(
                (m) => m.ShippingDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
