/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {ConfirmDispatchComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch.component';

/* Guards Imports */
import {ConfirmDispatchGuard} from '@appGuards/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmDispatchComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.confirmDispatch.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.confirmDispatch.list,
            loadChildren: () =>
              import('./confirm-dispatch-list/confirm-dispatch-list.module').then(
                (m) => m.ConfirmDispatchListModule,
              ),
          },
          {
            path: appRoutes.confirmDispatch.details,
            loadChildren: () =>
              import('./confirm-dispatch-details/confirm-dispatch-details.module').then(
                (m) => m.ConfirmDispatchDetailsModule,
              ),
            // TODO: Agregar Guard
            canLoad: [ConfirmDispatchGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ConfirmDispatchRoutingModule {}
