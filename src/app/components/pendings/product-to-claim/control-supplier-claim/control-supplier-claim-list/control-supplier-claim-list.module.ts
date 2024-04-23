import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlSupplierClaimListComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.component';
import {ControlSupplierClaimListRoutingModule} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [ControlSupplierClaimListComponent],
  imports: [
    CommonModule,
    ControlSupplierClaimListRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    TranslateModule,
    DoughnutChartModule,
    BarChartModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ControlSupplierClaimListComponent],
})
export class ControlSupplierClaimListModule {}
