import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingDashboardComponent} from './shipping-dashboard.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {ShippingDashboardRoutingModule} from '@appComponents/pendings/assorting-manager/shipping/shipping-dashboard/shipping-dashboard-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';

@NgModule({
  declarations: [ShippingDashboardComponent],
  imports: [
    CommonModule,
    TabsModule,
    DoughnutChartModule,
    PopUpGenericModule,
    AccountingModule,
    ShippingDashboardRoutingModule,
    DropDownListModule,
  ],
  exports: [ShippingDashboardComponent],
})
export class ShippingDashboardModule {}
