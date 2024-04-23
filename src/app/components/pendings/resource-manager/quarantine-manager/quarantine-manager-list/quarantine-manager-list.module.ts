import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuarantineManagerListComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.component';
import {QuarantineManagerListRoutingModule} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [QuarantineManagerListComponent],
  imports: [
    CommonModule,
    QuarantineManagerListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    DoughnutChartModule,
    BarChartModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [QuarantineManagerListComponent],
})
export class QuarantineManagerListModule {}
