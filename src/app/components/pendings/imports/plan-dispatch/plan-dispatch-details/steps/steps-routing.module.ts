import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StepsComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/steps.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StepsRoutingModule {}
