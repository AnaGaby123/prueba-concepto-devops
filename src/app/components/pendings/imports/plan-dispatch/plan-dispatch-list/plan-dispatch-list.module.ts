/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Modules Imports */
import {PlanDispatchListRoutingModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list-routing.module';

/* Components Imports */
import {PlanDispatchListComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.component';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    PlanDispatchListRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    DoughnutChartModule,
    TranslateModule,
    BarChartModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [PlanDispatchListComponent],
  declarations: [PlanDispatchListComponent],
})
export class PlanDispatchListModule {}
