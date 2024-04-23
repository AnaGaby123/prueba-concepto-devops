import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
/* Components Imports */
import {DispatchMonitoringComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring.component';

import {DispatchMonitoringDetailsGuard} from '@appGuards/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DispatchMonitoringComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.dispatchMonitoring.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.dispatchMonitoring.list,
            loadChildren: () =>
              import('./dispatch-monitoring-list/dispatch-monitoring-list.module').then(
                (m) => m.DispatchMonitoringListModule,
              ),
          },
          {
            path: appRoutes.dispatchMonitoring.details,
            loadChildren: () =>
              import('./dispatch-monitoring-details/dispatch-monitoring-details.module').then(
                (m) => m.DispatchMonitoringDetailsModule,
              ),
            // TODO: Agregar Guard
            canLoad: [DispatchMonitoringDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DispatchMonitoringRoutingModule {}
