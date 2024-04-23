import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LogisticConfigurationListComponent} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-list/logistic-configuration-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: LogisticConfigurationListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LogisticConfigurationListRoutingModule {}
