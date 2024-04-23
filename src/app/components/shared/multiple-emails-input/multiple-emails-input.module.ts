import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultipleEmailsInputComponent} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.component';

@NgModule({
  declarations: [MultipleEmailsInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [MultipleEmailsInputComponent],
})
export class MultipleEmailsInputModule {}
