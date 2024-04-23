import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchasingConfigurationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details/purchasing-configuration-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: PurchasingConfigurationDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PurchasingConfigurationDetailsRoutingModule {}
