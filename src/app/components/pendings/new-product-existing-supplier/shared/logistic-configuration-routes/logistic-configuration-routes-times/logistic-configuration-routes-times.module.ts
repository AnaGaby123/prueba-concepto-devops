import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationRoutesTimesComponent} from './logistic-configuration-routes-times.component';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LogisticConfigurationRoutesTimesComponent],
  imports: [CommonModule, PqfGenericInputModule, TranslateModule],
  exports: [LogisticConfigurationRoutesTimesComponent],
})
export class LogisticConfigurationRoutesTimesModule {}
