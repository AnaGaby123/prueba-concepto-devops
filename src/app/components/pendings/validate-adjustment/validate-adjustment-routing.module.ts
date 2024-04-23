import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ValidateAdjustmentComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment.component';
import {ValidateAdjustmentGuard} from '@appGuards/pendings/validate-adjustment/validate-adjustment.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ValidateAdjustmentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.validateAdjustment.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.validateAdjustment.dashboard,
            loadChildren: () =>
              import('./validate-adjustment-dashboard/validate-adjustment-dashboard.module').then(
                (m) => m.ValidateAdjustmentDashboardModule,
              ),
          },
          {
            path: appRoutes.validateAdjustment.details,
            loadChildren: () =>
              import('./validate-adjustment-details/validate-adjustment-details.module').then(
                (m) => m.ValidateAdjustmentDetailsModule,
              ),
            canLoad: [ValidateAdjustmentGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ValidateAdjustmentRoutingModule {}
