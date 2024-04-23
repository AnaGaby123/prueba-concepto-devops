import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralDataDailyMeetingsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/general-data-daily-meeting.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GeneralDataDailyMeetingsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GeneralDataDailyMeetingRoutingModule {}
