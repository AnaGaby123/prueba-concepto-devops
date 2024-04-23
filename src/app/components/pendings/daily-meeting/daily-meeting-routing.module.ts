import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DailyMeetingComponent} from '@appComponents/pendings/daily-meeting/daily-meeting.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DailyMeetingComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.dailyMeeting.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.dailyMeeting.list,
            loadChildren: () =>
              import('./daily-meeting-dashboard/daily-meeting-dashboard.module').then(
                (m) => m.DailyMeetingDashboardModule,
              ),
          },
          {
            path: appRoutes.dailyMeeting.dailyMeetingDetails,
            loadChildren: () =>
              import('./daily-meeting-details/daily-meeting-details.module').then(
                (m) => m.DailyMeetingDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DailyMeetingRoutingModule {}
