import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClientPreProcessingRoutingModule} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard-routing.module';
import {PreprocessDashboardItemComponent} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-dashboard-item/preprocess-dashboard-item.component';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientPreProcessingRoutingModule,
    DateFormatModule,
    TranslateModule,
  ],
  exports: [PreprocessDashboardItemComponent],
  declarations: [PreprocessDashboardItemComponent],
})
export class PreprocessOrderDashboardItemModule {}
