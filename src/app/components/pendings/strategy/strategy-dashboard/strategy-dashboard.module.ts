import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyDashboardComponent} from '@appComponents/pendings/strategy/strategy-dashboard/strategy-dashboard.component';
import {TranslateModule} from '@ngx-translate/core';
import {StrategyDashboardRoutingModule} from '@appComponents/pendings/strategy/strategy-dashboard/strategy-dashboard-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {StrategyDashboardItemModule} from '@appComponents/pendings/strategy/strategy-dashboard/strategy-dashboard-item/strategy-dashboard-item.module';

@NgModule({
  declarations: [StrategyDashboardComponent],
  imports: [
    BarChartModule,
    CommonModule,
    DateRangeModule,
    DoughnutChartModule,
    HamburgerMenuModule,
    LoadingModule,
    SearchModule,
    StrategyDashboardItemModule,
    StrategyDashboardRoutingModule,
    TabsModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
  ],
  exports: [StrategyDashboardComponent],
})
export class StrategyDashboardModule {}
