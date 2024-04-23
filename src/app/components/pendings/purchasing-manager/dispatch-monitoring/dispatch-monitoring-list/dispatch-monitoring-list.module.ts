import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DispatchMonitoringListComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.component';
import {DispatchMonitoringListRoutingModule} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    DispatchMonitoringListRoutingModule,
    TranslateModule,
    DoughnutChartModule,
    BarChartModule,
    SearchModule,
    HamburgerMenuModule,
    LoadingModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DateFormatModule,
  ],
  exports: [DispatchMonitoringListComponent],
  declarations: [DispatchMonitoringListComponent],
})
export class DispatchMonitoringListModule {}
