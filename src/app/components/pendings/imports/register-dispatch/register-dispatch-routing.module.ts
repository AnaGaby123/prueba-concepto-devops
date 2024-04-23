/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterDispatchComponent} from '@appComponents/pendings/imports/register-dispatch/register-dispatch.component';
import {RegisterDispatchDetailsGuard} from '@appGuards/pendings/imports/register-dispatch/register-dispatch-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterDispatchComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.registerDispatch.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.registerDispatch.list,
            loadChildren: () =>
              import('./register-dispatch-list/register-dispatch-list.module').then(
                (m) => m.RegisterDispatchListModule,
              ),
          },
          {
            path: appRoutes.registerDispatch.details,
            loadChildren: () =>
              import('./register-dispatch-details/register-dispatch-details.module').then(
                (m) => m.RegisterDispatchDetailsModule,
              ),
            canLoad: [RegisterDispatchDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterDispatchRoutingModule {}
