import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenerateOrderComponent} from './generate-order.component';
import {TranslateModule} from '@ngx-translate/core';
import {GraphicsComponent} from './graphics/graphics.component';
import {ListComponent} from './list/list.component';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [GenerateOrderComponent, GraphicsComponent, ListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DoughnutChartModule,
    BarChartModule,
    VirtualScrollerModule,
    DateFormatModule,
  ],
  exports: [GenerateOrderComponent],
})
export class GenerateOrderModule {}
