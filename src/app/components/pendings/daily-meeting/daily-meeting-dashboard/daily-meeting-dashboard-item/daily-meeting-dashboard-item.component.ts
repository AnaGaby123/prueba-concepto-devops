import {Component, Input} from '@angular/core';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';

@Component({
  selector: 'app-daily-meeting-dashboard-item',
  templateUrl: './daily-meeting-dashboard-item.component.html',
  styleUrls: ['./daily-meeting-dashboard-item.component.scss'],
})
export class DailyMeetingDashboardItemComponent {
  @Input() dailyMeeting: Evi;
  @Input() index: number;
}
