/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {PlanDispatchComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch.component';

import {PlanDispatchDetailsGuard} from '@appGuards/pendings/imports/plan-dispatch/plan-dispatch-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlanDispatchComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.planDispatch.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.planDispatch.list,
            loadChildren: () =>
              import('./plan-dispatch-list/plan-dispatch-list.module').then(
                (m) => m.PlanDispatchListModule,
              ),
          },
          {
            path: appRoutes.planDispatch.details,
            loadChildren: () =>
              import('./plan-dispatch-details/plan-dispatch-details.module').then(
                (m) => m.PlanDispatchDetailsModule,
              ),
            canLoad: [PlanDispatchDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class PlanDispatchRoutingModule {}
