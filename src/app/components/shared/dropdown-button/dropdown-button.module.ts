import {NgModule} from '@angular/core';
import {DropdownButtonComponent} from '@appComponents/shared/dropdown-button/dropdown-button.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [DropdownButtonComponent],
  declarations: [DropdownButtonComponent],
})
export class DropdownButtonModule {}
