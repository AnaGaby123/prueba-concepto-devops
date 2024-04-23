import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropDownMultilabelListComponent} from '@appComponents/shared/drop-down-multilabel-list/drop-down-multilabel-list.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DropDownMultilabelListComponent],
  imports: [CommonModule, TranslateModule],
  exports: [DropDownMultilabelListComponent],
})
export class DropDownMultilabelListModule {}
