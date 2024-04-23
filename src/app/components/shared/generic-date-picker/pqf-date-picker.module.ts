import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PqfDatePickerComponent} from './pqf-date-picker.component';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [PqfDatePickerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DateFormatModule],
  exports: [PqfDatePickerComponent],
})
export class PqfDatePickerModule {}
