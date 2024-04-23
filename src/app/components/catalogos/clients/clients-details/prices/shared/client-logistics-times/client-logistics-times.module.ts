import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLogisticsTimesComponent} from './client-logistics-times.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientLogisticsTimesComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ClientLogisticsTimesComponent],
})
export class ClientLogisticsTimesModule {}
