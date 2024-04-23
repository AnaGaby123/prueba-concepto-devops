import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendReviewPaymentListComponent} from './attend-review-payment-list.component';
import {AttendReviewPaymentListRoutingModule} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [AttendReviewPaymentListComponent],
  imports: [
    CommonModule,
    AttendReviewPaymentListRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    DoughnutChartModule,
    TranslateModule,
    BarChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [AttendReviewPaymentListComponent],
})
export class AttendReviewPaymentListModule {}
