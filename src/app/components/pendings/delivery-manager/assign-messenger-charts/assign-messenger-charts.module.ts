import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignMessengerChartsComponent} from '@appComponents/pendings/delivery-manager/assign-messenger-charts/assign-messenger-charts.component';
import {AssignMessengerChartsRoutingModule} from '@appComponents/pendings/delivery-manager/assign-messenger-charts/assign-messenger-charts-routing.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AssignMessengerChartsComponent],
  imports: [CommonModule, AssignMessengerChartsRoutingModule, DoughnutChartModule, TranslateModule],
  exports: [AssignMessengerChartsComponent],
})
export class AssignMessengerChartsModule {}
