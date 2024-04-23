import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareTransitArrivalComponent} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.component';
import {DeclareTransitArrivalDetailsGuard} from '@appGuards/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeclareTransitArrivalComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.declareTransitArrival.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.declareTransitArrival.list,
            loadChildren: () =>
              import('./declare-transit-arrival-list/declare-transit-arrival-list.module').then(
                (m) => m.DeclareTransitArrivalListModule,
              ),
          },
          {
            path: appRoutes.declareTransitArrival.details,
            loadChildren: () =>
              import(
                './declare-transit-arrival-details/declare-transit-arrival-details.module'
              ).then((m) => m.DeclareTransitArrivalDetailsModule),
            canLoad: [DeclareTransitArrivalDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeclareTransitArrivalRoutingModule {}
