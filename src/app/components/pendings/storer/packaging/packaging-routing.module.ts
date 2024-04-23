import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PackagingComponent} from '@appComponents/pendings/storer/packaging/packaging.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: PackagingComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.packaging.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.packaging.dashboard,
            loadChildren: () =>
              import('./packaging-dashboard/packaging-dashboard.module').then(
                (m) => m.PackagingDashboardModule,
              ),
          },
          {
            path: appRoutes.packaging.details,
            loadChildren: () =>
              import('./packaging-details/packaging-details.module').then(
                (m) => m.PackagingDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PackagingRoutingModule {}
