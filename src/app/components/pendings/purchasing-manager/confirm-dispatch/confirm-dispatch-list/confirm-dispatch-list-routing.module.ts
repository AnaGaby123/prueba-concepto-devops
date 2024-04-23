/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {ConfirmDispatchListComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmDispatchListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ConfirmDispatchListRoutingModule {}
