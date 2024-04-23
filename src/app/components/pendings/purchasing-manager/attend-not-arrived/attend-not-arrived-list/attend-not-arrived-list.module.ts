import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendNotArriveListComponent} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-list/attend-not-arrive-list.component';
import {AttendNotArrivedListRoutingModule} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-list/attend-not-arrived-list-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [AttendNotArriveListComponent],
  imports: [
    CommonModule,
    AttendNotArrivedListRoutingModule,
    HamburgerMenuModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
    DateFormatModule,
  ],
  exports: [AttendNotArriveListComponent],
})
export class AttendNotArrivedListModule {}
