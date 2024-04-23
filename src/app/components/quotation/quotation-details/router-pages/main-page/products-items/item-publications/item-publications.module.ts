import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemPublicationsComponent} from './item-publications.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ItemPublicationsComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule],
  exports: [ItemPublicationsComponent],
})
export class ItemPublicationsModule {}
