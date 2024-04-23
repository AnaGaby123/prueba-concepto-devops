import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingConsoleComponent} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShippingConsoleComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.shipping.consoleList,
            pathMatch: 'full',
          },
          {
            path: appRoutes.shipping.consoleList,
            loadChildren: () =>
              import('./shipping-console-list/shipping-console-list.module').then(
                (m) => m.ShippingConsoleListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingConsoleRoutingModule {}
