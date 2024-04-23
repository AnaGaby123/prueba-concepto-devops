/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
/* Components Imports */
import {DispatchMonitoringDetailsComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DispatchMonitoringDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DispatchMonitoringDetailsRoutingModule {}
