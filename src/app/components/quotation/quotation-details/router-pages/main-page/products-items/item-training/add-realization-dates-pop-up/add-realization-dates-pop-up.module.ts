import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddRealizationDatesPopUpComponent} from './add-realization-dates-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [AddRealizationDatesPopUpComponent],
  imports: [CommonModule, PopUpGenericModule, DatePickerModule, TranslateModule, DateFormatModule],
  exports: [AddRealizationDatesPopUpComponent],
})
export class AddRealizationDatesPopUpModule {}
