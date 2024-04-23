import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesConfigurationComponent} from '@appComponents/pendings/new-product-existing-supplier/sales-configuration/sales-configuration.component';
import {appRoutes} from '@appHelpers/core/app-routes';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: SalesConfigurationComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.salesConfiguration.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.salesConfiguration.details,
            loadChildren: () =>
              import('./sales-configuration-details/sales-configuration-details.module').then(
                (m) => m.SalesConfigurationDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SalesConfigurationRoutingModule {}
