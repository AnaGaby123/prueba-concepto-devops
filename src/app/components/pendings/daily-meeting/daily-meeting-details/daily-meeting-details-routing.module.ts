import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DailyMeetingDetailsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.component';
import {DailyMeetingDetailsGuardService} from '@appGuards/daily-meeting/daily-meeting-details-guard.service';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DailyMeetingDetailsComponent,
        canActivate: [DailyMeetingDetailsGuardService],
        children: [
          {
            path: '',
            redirectTo: appRoutes.dailyMeeting.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.dailyMeeting.details,
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DailyMeetingDetailsRoutingModule {}
