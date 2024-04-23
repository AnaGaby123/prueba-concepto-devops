import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfDropDownListComponent} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.component';
import {FormsModule} from '@angular/forms';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';

@NgModule({
  declarations: [PqfDropDownListComponent],
  imports: [CommonModule, FormsModule, PqfCheckBoxModule],
  exports: [PqfDropDownListComponent],
})
export class PqfDropDownListModule {}
