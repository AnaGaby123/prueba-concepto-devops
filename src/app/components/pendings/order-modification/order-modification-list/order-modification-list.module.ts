import {NgModule} from '@angular/core';
import {OrderModificationListComponent} from '@appComponents/pendings/order-modification/order-modification-list/order-modification-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OrderModificationListRoutingModule} from '@appComponents/pendings/order-modification/order-modification-list/order-modification-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderModificationListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    BarChartModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [OrderModificationListComponent],
  declarations: [OrderModificationListComponent],
})
export class OrderModificationListModule {}
