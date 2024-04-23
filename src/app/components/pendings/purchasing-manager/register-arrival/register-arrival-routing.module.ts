/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {RegisterArrivalComponent} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterArrivalComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.registerArrival.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.registerArrival.list,
            loadChildren: () =>
              import('./register-arrival-list/register-arrival-list.module').then(
                (m) => m.RegisterArrivalListModule,
              ),
          },
          {
            path: appRoutes.registerArrival.details,
            loadChildren: () =>
              import('./register-arrival-details/register-arrival-details.module').then(
                (m) => m.RegisterArrivalDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterArrivalRoutingModule {}
