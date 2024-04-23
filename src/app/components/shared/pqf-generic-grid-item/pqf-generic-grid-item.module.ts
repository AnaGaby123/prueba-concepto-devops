import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGenericGridItemComponent} from '@appComponents/shared/pqf-generic-grid-item/pqf-generic-grid-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfGenericGridItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PqfGenericGridItemComponent],
})
export class PqfGenericGridItemModule {}
