import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DailyMeetingDashboardComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DailyMeetingDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DailyMeetingDashboardRoutingModule {}
