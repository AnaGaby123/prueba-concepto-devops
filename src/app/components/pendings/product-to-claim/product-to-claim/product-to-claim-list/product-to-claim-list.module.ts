/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {ProductToClaimListComponent} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.component';

/* Module Imports */
import {CommonModule} from '@angular/common';
import {ProductToClaimListRoutingModule} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    ProductToClaimListRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    TranslateModule,
    DoughnutChartModule,
    BarChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ProductToClaimListComponent],
  declarations: [ProductToClaimListComponent],
})
export class ProductToClaimListModule {}
