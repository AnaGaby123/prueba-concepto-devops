import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CollectionMonitoringComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring.component';
import {CollectionMonitoringDetailsGuard} from '@appGuards/pendings/charges/collection-monitoring/collection-monitoring-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: CollectionMonitoringComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.collectionMonitoring.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.collectionMonitoring.list,
            loadChildren: () =>
              import('./collection-monitoring-list/collection-monitoring-list.module').then(
                (m) => m.CollectionMonitoringListModule,
              ),
          },
          {
            path: appRoutes.collectionMonitoring.details,
            loadChildren: () =>
              import('./collection-monitoring-details/collection-monitoring-details.module').then(
                (m) => m.CollectionMonitoringDetailsModule,
              ),
            canLoad: [CollectionMonitoringDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CollectionMonitoringRoutingModule {}
