import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ValidateAdjustmentDashboardComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ValidateAdjustmentDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ValidateAdjustmentDashboardRoutingModule {}
