import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClientPreProcessingRoutingModule} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard-routing.module';
import {PreprocessOrderDashboardComponent} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.component';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PreprocessOrderDashboardItemModule} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-dashboard-item/preprocess-dashboard-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientPreProcessingRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    DoughnutChartModule,
    BarChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DateFormatModule,
    DropdownButtonModule,
    DateRangeModule,
    LoadingModule,
    PreprocessOrderDashboardItemModule,
  ],
  exports: [PreprocessOrderDashboardComponent],
  declarations: [PreprocessOrderDashboardComponent],
})
export class PreprocessOrderDashboardModule {}
