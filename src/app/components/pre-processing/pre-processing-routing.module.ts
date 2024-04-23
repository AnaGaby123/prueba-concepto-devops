import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PreProcessingComponent} from '@appComponents/pre-processing/pre-processing.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PreProcessingComponent,
        children: [
          {path: '', redirectTo: appRoutes.preProcessing.dashboard, pathMatch: 'full'},
          {
            path: appRoutes.preProcessing.dashboard,
            loadChildren: () =>
              import('./preprocess-order-dashboard/preprocess-order-dashboard.module').then(
                (m) => m.PreprocessOrderDashboardModule,
              ),
          },
          {
            path: appRoutes.preProcessing.orderDetails,
            loadChildren: () =>
              import('./preprocess-order-detail/preprocess-order-detail.module').then(
                (m) => m.PreprocessOrderDetailModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PreProcessingRoutingModule {}
