import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackOrderFormComponent} from './back-order-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';

@NgModule({
  declarations: [BackOrderFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    GenericTextAreaModule,
    DatePickerModule,
    GenericInputFileModule,
  ],
  exports: [BackOrderFormComponent],
})
export class BackOrderFormModule {}
