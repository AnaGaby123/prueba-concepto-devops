import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferAdjustmentListComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.component';
import {OfferAdjustmentListRoutingModule} from '@appComponents/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [OfferAdjustmentListComponent],
  imports: [
    CommonModule,
    OfferAdjustmentListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
    DateRangeModule,
    LoadingModule,
  ],
  exports: [OfferAdjustmentListComponent],
})
export class OfferAdjustmentListModule {}
