import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {QuotationDashboardComponent} from '@appComponents/quotation/quotation-dashboard/quotation-dashboard.component';
import {QuotationDashboardRoutingModule} from '@appComponents/quotation/quotation-dashboard/quotation-dashboard-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {LinkedQuoteModule} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/linked-quote.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {QuotationDashboardItemModule} from '@appComponents/quotation/quotation-dashboard/quotation-dashboard-item/quotation-dashboard-item.module';

@NgModule({
  declarations: [QuotationDashboardComponent],
  imports: [
    CommonModule,
    BarChartModule,
    DoughnutChartModule,
    SearchModule,
    TabsModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    QuotationDashboardRoutingModule,
    BarChartModule,
    HamburgerMenuModule,
    LinkedQuoteModule,
    DateRangeModule,
    LoadingModule,
    QuotationDashboardItemModule,
  ],
  exports: [QuotationDashboardComponent],
})
export class QuotationDashboardModule {}
