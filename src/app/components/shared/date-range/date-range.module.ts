import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DateRangeComponent} from '@appComponents/shared/date-range/date-range.component';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatePickerModule],
  exports: [DateRangeComponent],
  declarations: [DateRangeComponent],
})
export class DateRangeModule {}
