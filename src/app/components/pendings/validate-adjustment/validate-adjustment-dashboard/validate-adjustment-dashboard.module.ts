import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidateAdjustmentDashboardComponent} from './validate-adjustment-dashboard.component';
import {ValidateAdjustmentDashboardRoutingModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ValidateAdjustmentDashboardItemModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard-item/validate-adjustment-dashboard-item.module';

@NgModule({
  declarations: [ValidateAdjustmentDashboardComponent],
  imports: [
    CommonModule,
    ValidateAdjustmentDashboardRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DateFormatModule,
    DoughnutChartModule,
    BarChartModule,
    DateRangeModule,
    LoadingModule,
    ValidateAdjustmentDashboardItemModule,
  ],
  exports: [ValidateAdjustmentDashboardComponent],
})
export class ValidateAdjustmentDashboardModule {}
