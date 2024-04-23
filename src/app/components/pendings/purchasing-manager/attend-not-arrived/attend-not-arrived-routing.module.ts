import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendNotArrivedComponent} from '@purchasing-manager/attend-not-arrived/attend-not-arrived.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendNotArrivedComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.attendNotArrived.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.attendNotArrived.list,
            loadChildren: () =>
              import('./attend-not-arrived-list/attend-not-arrived-list.module').then(
                (m) => m.AttendNotArrivedListModule,
              ),
          },
          {
            path: appRoutes.attendNotArrived.details,
            loadChildren: () =>
              import('./attend-not-arrived-details/attend-not-arrived-details.module').then(
                (m) => m.AttendNotArrivedDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendNotArrivedRoutingModule {}
