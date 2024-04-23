import {NgModule} from '@angular/core';
import {InspectorComponent} from './inspector.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: InspectorComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.inspector.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.inspector.dashboard,
            loadChildren: () =>
              import('./inspector-dashboard/inspector-dashboard.module').then(
                (m) => m.InspectorDashboardModule,
              ),
          },
          {
            path: appRoutes.inspector.details,
            loadChildren: () =>
              import('./inspector-details/inspector-details.module').then(
                (m) => m.InspectorDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InspectorRoutingModule {}
