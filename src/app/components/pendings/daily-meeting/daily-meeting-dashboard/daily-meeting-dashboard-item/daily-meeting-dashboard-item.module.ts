import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMeetingDashboardItemComponent} from './daily-meeting-dashboard-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DailyMeetingDashboardItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [DailyMeetingDashboardItemComponent],
})
export class DailyMeetingDashboardItemModule {}
