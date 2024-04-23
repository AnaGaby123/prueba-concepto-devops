/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {ConfirmDispatchDetailsComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmDispatchDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ConfirmDispatchDetailsRoutingModule {}
