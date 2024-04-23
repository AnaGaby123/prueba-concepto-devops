/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Modules Imports */
import {RegisterDispatchListRoutingModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list-routing.module';

/* Components Imports */
import {RegisterDispatchListComponent} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.component';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterDispatchListRoutingModule,
    BarChartModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    DoughnutChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [RegisterDispatchListComponent],
  declarations: [RegisterDispatchListComponent],
})
export class RegisterDispatchListModule {}
