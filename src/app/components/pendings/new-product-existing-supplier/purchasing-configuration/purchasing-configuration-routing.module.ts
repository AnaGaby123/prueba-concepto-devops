import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchasingConfigurationComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: PurchasingConfigurationComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.purchasingConfiguration.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.purchasingConfiguration.details,
            loadChildren: () =>
              import(
                './purchasing-configuration-details/purchasing-configuration-details.module'
              ).then((m) => m.PurchasingConfigurationDetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PurchasingConfigurationRoutingModule {}
