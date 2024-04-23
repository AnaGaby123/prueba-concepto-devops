import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SalesConfigurationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details/sales-configuration-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: SalesConfigurationDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SalesConfigurationDetailsRoutingModule {}
