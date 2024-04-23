import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ValidateAdjustmentDetailsComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ValidateAdjustmentDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ValidateAdjustmentDetailsRoutingModule {}
