import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ControlMaterialDeliveryListRoutingModule} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list-routing.module';
import {ControlMaterialDeliveryListComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ControlMaterialDeliveryListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ControlMaterialDeliveryListComponent],
  declarations: [ControlMaterialDeliveryListComponent],
})
export class ControlMaterialDeliveryListModule {}
