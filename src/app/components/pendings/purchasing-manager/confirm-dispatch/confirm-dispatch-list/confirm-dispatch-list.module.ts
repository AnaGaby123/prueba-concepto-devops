/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ConfirmDispatchListComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.component';

/* Module Imports */
import {ConfirmDispatchListRoutingModule} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDispatchListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
    DoughnutChartModule,
    BarChartModule,
  ],
  exports: [ConfirmDispatchListComponent],
  declarations: [ConfirmDispatchListComponent],
})
export class ConfirmDispatchListModule {}
