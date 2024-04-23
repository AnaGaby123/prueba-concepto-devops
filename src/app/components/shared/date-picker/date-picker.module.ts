import {NgModule} from '@angular/core';
import {DatePickerComponent} from './date-picker.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [DatePickerComponent],
  declarations: [DatePickerComponent],
})
export class DatePickerModule {}
