import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareTransitArrivalListComponent} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.component';
import {DeclareTransitArrivalListRoutingModule} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list-routing.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeclareTransitArrivalListRoutingModule,
    DoughnutChartModule,
    BarChartModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [DeclareTransitArrivalListComponent],
  declarations: [DeclareTransitArrivalListComponent],
})
export class DeclareTransitArrivalListModule {}
