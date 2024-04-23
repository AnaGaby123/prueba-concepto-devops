import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.dailyMeeting.sectionList,
            pathMatch: 'full',
          },
          {
            path: appRoutes.dailyMeeting.sectionList,
            loadChildren: () =>
              import('./sections/list-daily-meetings/general-data-daily-meeting.module').then(
                (m) => m.GeneralDataDailyMeetingModule,
              ),
          },
        ],
      },
    ]),
  ],
})
export class DetailsRoutingModule {}
