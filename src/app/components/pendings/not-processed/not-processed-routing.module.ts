import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotProcessedComponent} from '@appComponents/pendings/not-processed/not-processed.component';
import {NotProcessedGuardService} from '@appGuards/pendings/not-processed/not-processed.guard.service';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotProcessedComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.notProcessed.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.notProcessed.dashboard,
            loadChildren: () =>
              import('./not-processed-dashboard/not-processed-dashboard.module').then(
                (m) => m.NotProcessedDashboardModule,
              ),
          },
          {
            path: appRoutes.notProcessed.details,
            loadChildren: () =>
              import('./not-processed-details/not-processed-details.module').then(
                (m) => m.NotProcessedDetailsModule,
              ),
            canLoad: [NotProcessedGuardService],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NotProcessedRoutingModule {}
