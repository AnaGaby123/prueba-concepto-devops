import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureShipmentListRoutingModule} from './secure-shipment-list-routing.module';
import {SecureShipmentListComponent} from '@purchasing-manager/secure-shipment/secure-shipment-list/secure-shipment-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';

@NgModule({
  declarations: [SecureShipmentListComponent],
  imports: [
    CommonModule,
    SecureShipmentListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
    BarChartModule,
    DoughnutChartModule,
  ],
  exports: [SecureShipmentListComponent],
})
export class SecureShipmentListModule {}
