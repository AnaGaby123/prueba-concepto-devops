import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GenericTextAreaComponent} from '@appComponents/shared/generic-text-area/generic-text-area.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [GenericTextAreaComponent],
  declarations: [GenericTextAreaComponent],
})
export class GenericTextAreaModule {}
