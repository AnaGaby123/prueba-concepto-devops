import {NgModule} from '@angular/core';
import {RadioButtonComponent} from '@appComponents/shared/radio-button/radio-button.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [RadioButtonComponent],
  declarations: [RadioButtonComponent],
})
export class RadioButtonModule {}
