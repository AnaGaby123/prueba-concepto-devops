/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {WarehouseDashboardComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard.component';

/* Module Imports */
import {CommonModule} from '@angular/common';
import {WarehouseDashboardRoutingModule} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    WarehouseDashboardRoutingModule,
    TabsModule,
    DoughnutChartModule,
    TranslateModule,
  ],
  exports: [WarehouseDashboardComponent],
  declarations: [WarehouseDashboardComponent],
})
export class WarehouseDashboardModule {}
