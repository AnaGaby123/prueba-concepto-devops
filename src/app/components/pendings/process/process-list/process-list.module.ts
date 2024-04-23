import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessListComponent} from './process-list.component';
import {ProcessListRoutingModule} from '@appComponents/pendings/process/process-list/process-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';

@NgModule({
  declarations: [ProcessListComponent],
  imports: [
    CommonModule,
    ProcessListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
  ],
  exports: [ProcessListComponent],
})
export class ProcessListModule {}
