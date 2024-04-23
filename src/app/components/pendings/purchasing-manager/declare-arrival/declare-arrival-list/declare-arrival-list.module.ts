import {NgModule} from '@angular/core';
import {DeclareArrivalListComponent} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareArrivalListRoutingModule} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeclareArrivalListRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    BarChartModule,
    TranslateModule,
    TabsModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [DeclareArrivalListComponent],
  declarations: [DeclareArrivalListComponent],
})
export class DeclareArrivalListModule {}
