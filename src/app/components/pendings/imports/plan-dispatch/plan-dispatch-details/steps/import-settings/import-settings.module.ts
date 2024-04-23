import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportSettingsComponent} from './import-settings.component';
import {TranslateModule} from '@ngx-translate/core';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';

@NgModule({
  declarations: [ImportSettingsComponent],
  imports: [CommonModule, TranslateModule, RadioButtonModule, DoughnutChartModule],
  exports: [ImportSettingsComponent],
})
export class ImportSettingsModule {}
