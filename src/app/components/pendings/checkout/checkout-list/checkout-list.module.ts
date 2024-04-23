import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutListComponent} from '@appComponents/pendings/checkout/checkout-list/checkout-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {CheckoutListRoutingModule} from '@appComponents/pendings/checkout/checkout-list/checkout-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [CheckoutListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CheckoutListRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    BarChartModule,
    WithoutResultsModule,
    DateFormatModule,
    LoadingModule,
  ],
  exports: [CheckoutListComponent],
})
export class CheckoutListModule {}
