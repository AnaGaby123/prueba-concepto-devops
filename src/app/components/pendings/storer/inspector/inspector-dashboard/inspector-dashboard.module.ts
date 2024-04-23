import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InspectorDashboardComponent} from './inspector-dashboard.component';
import {InspectorDashboardRoutingModule} from '@appComponents/pendings/storer/inspector/inspector-dashboard/inspector-dashboard-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';

@NgModule({
  declarations: [InspectorDashboardComponent],
  imports: [
    CommonModule,
    InspectorDashboardRoutingModule,
    TabsModule,
    TranslateModule,
    DoughnutChartModule,
  ],
})
export class InspectorDashboardModule {}
