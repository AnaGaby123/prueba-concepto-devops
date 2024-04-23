import {NgModule} from '@angular/core';
import {MultiselectDropdownComponent} from './multiselect-dropdown.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  imports: [CheckBoxModule, CommonModule, FormsModule],
  exports: [MultiselectDropdownComponent],
  declarations: [MultiselectDropdownComponent],
})
export class MultiselectDropdownModule {}
