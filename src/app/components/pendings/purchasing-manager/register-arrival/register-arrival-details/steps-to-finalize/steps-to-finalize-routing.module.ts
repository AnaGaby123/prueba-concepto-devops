/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {StepsToFinalizeComponent} from '@purchasing-manager/register-arrival/register-arrival-details/steps-to-finalize/steps-to-finalize.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepsToFinalizeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StepsToFinalizeRoutingModule {}
