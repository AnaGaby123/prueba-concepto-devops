import {NgModule} from '@angular/core';
import {DeclareArrivalComponent} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival.component';
import {RouterModule} from '@angular/router';
import {DeclareArrivalDetailsGuard} from '@appGuards/pendings/purchasing-manager/declare-arrival/declare-arrival-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeclareArrivalComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.declareArrival.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.declareArrival.list,
            loadChildren: () =>
              import('./declare-arrival-list/declare-arrival-list.module').then(
                (m) => m.DeclareArrivalListModule,
              ),
          },
          {
            path: appRoutes.declareArrival.details,
            loadChildren: () =>
              import('./declare-arrival-details/declare-arrival-details.module').then(
                (m) => m.DeclareArrivalDetailsModule,
              ),
            canLoad: [DeclareArrivalDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeclareArrivalRoutingModule {}
