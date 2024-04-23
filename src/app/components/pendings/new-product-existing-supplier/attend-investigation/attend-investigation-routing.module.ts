import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendInvestigationDetailsGuard} from '@appGuards/pendings/attend-investigation/attend-investigation-details.guard';
import {AttendInvestigationComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: AttendInvestigationComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.attendInvestigation.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.attendInvestigation.list,
            loadChildren: () =>
              import('./attend-investigation-list/attend-investigation-list.module').then(
                (m) => m.AttendInvestigationListModule,
              ),
          },
          {
            path: appRoutes.attendInvestigation.details,
            loadChildren: () =>
              import('./attend-investigation-details/attend-investigation-details.module').then(
                (m) => m.AttendInvestigationDetailsModule,
              ),
            canLoad: [AttendInvestigationDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendInvestigationRoutingModule {}
