import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlanDispatchDetailsComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.component';
import {PlanDispatchDetailsStepsGuard} from '@appGuards/pendings/imports/plan-dispatch/plan-dispatch-details-steps.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlanDispatchDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.planDispatch.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.planDispatch.dashboard,
            loadChildren: () =>
              import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
          },
          {
            path: appRoutes.planDispatch.steps,
            loadChildren: () => import('./steps/steps.module').then((m) => m.StepsModule),
            canLoad: [PlanDispatchDetailsStepsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PlanDispatchDetailsRoutingModule {}
