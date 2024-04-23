import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownButtonCustomComponent} from '@appComponents/shared/dropdown-button-custom/dropdown-button-custom.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [DropdownButtonCustomComponent],
  declarations: [DropdownButtonCustomComponent],
})
export class DropdownButtonCustomModule {}
