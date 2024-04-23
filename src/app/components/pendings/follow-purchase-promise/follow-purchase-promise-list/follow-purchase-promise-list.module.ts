import {NgModule} from '@angular/core';
import {FollowPurchasePromiseListComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FollowPurchasePromiseListRoutingModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [FollowPurchasePromiseListComponent],
  exports: [FollowPurchasePromiseListComponent],
  imports: [
    CommonModule,
    FormsModule,
    FollowPurchasePromiseListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    DoughnutChartModule,
    BarChartModule,
    VirtualScrollerModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
  ],
})
export class FollowPurchasePromiseListModule {}
