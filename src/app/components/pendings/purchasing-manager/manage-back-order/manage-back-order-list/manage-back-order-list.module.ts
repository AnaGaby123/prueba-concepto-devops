import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ManageBackOrderListComponent} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.component';
import {ManageBackOrderListRoutingModule} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageBackOrderListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    BarChartModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ManageBackOrderListComponent],
  declarations: [ManageBackOrderListComponent],
})
export class ManageBackOrderListModule {}
