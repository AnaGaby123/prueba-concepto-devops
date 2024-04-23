import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropDownListComponent} from './drop-down-list.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  declarations: [DropDownListComponent],
  imports: [CommonModule, FormsModule, TranslateModule, CheckBoxModule],
  exports: [DropDownListComponent],
})
export class DropDownListModule {}
