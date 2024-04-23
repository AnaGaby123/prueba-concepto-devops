import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericGridItemComponent} from '@appComponents/shared/generic-grid-item/generic-grid-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GenericGridItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [GenericGridItemComponent],
})
export class GenericGridItemModule {}
