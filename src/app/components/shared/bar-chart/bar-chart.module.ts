import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BarChartComponent} from '@appComponents/shared/bar-chart/bar-chart.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [BarChartComponent],
  declarations: [BarChartComponent],
})
export class BarChartModule {}
