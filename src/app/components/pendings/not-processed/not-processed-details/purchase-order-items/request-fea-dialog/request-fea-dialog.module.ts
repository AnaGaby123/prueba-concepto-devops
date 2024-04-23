import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestFeaDialogComponent} from './request-fea-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [RequestFeaDialogComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    GenericInputModule,
    DatePickerModule,
    GenericTextAreaModule,
    DateFormatModule,
  ],
})
export class RequestFeaDialogModule {}
