import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeliveryManagerComponent} from '@appComponents/pendings/delivery-manager/delivery-manager.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeliveryManagerComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.assignMessengerCharts.assignMessengerCharts,
            pathMatch: 'full',
          },
          {
            path: appRoutes.assignMessengerCharts.assignMessengerCharts,
            loadChildren: () =>
              import('./assign-messenger-charts/assign-messenger-charts.module').then(
                (m) => m.AssignMessengerChartsModule,
              ),
          },
          {
            path: appRoutes.assignMessengerCharts.details,
            loadChildren: () =>
              import('./assign-messenger-details/assign-messenger-details.module').then(
                (m) => m.AssignMessengerDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeliveryManagerRoutingModule {}
