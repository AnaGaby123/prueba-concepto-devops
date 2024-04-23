import {NgModule} from '@angular/core';
import {ProcessPurchaseListComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessPurchaseListRoutingModule} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProcessPurchaseListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    DoughnutChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ProcessPurchaseListComponent],
  declarations: [ProcessPurchaseListComponent],
})
export class ProcessPurchaseListModule {}
