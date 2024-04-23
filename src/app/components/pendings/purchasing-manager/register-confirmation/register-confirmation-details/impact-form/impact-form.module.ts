import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImpactFormComponent} from './impact-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';

@NgModule({
  declarations: [ImpactFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DatePickerModule,
    GenericInputModule,
    GenericInputFileModule,
    GenericTextAreaModule,
    RadioButtonModule,
  ],
  exports: [ImpactFormComponent],
})
export class ImpactFormModule {}
