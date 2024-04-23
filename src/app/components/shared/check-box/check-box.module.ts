import {NgModule} from '@angular/core';
import {CheckBoxComponent} from './check-box.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CheckBoxComponent],
  declarations: [CheckBoxComponent],
})
export class CheckBoxModule {}
