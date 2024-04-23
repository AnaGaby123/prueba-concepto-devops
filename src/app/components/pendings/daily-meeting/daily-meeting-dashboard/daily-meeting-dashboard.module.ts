import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMeetingDashboardComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.component';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DailyMeetingDashboardRoutingModule} from '@appComponents/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard-routing.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DailyMeetingDashboardItemModule} from '@appComponents/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard-item/daily-meeting-dashboard-item.module';

@NgModule({
  declarations: [DailyMeetingDashboardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DailyMeetingDashboardRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    VirtualScrollerModule,
    SearchModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
    DateRangeModule,
    LoadingModule,
    DailyMeetingDashboardItemModule,
  ],
  exports: [DailyMeetingDashboardComponent],
})
export class DailyMeetingDashboardModule {}
