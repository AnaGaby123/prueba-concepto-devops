import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WithoutImpactFormComponent} from './without-impact-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [WithoutImpactFormComponent],
  imports: [CommonModule, TranslateModule, DatePickerModule, GenericInputModule],
  exports: [WithoutImpactFormComponent],
})
export class WithoutImpactFormModule {}
