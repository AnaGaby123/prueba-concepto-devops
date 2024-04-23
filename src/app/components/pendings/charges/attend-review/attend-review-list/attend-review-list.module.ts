import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendReviewListComponent} from '@appComponents/pendings/charges/attend-review/attend-review-list/attend-review-list.component';
import {AttendReviewListRoutingModule} from '@appComponents/pendings/charges/attend-review/attend-review-list/attend-review-list-routing.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    AttendReviewListRoutingModule,
    BarChartModule,
    DoughnutChartModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [AttendReviewListComponent],
  declarations: [AttendReviewListComponent],
})
export class AttendReviewListModule {}
