import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LogisticConfigurationComponent} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: LogisticConfigurationComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.logisticConfiguration.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.logisticConfiguration.details,
            loadChildren: () =>
              import('./logistic-configuration-list/logistic-configuration-list.module').then(
                (m) => m.LogisticConfigurationListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LogisticConfigurationRoutingModule {}
