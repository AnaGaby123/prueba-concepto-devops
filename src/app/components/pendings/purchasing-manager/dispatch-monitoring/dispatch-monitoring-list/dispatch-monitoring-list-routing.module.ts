/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
/* Components Imports */
import {DispatchMonitoringListComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DispatchMonitoringListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DispatchMonitoringListRoutingModule {}
