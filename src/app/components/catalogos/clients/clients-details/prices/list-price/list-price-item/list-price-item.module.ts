import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPriceItemComponent} from './list-price-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ListPriceItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ListPriceItemComponent],
})
export class ListPriceItemModule {}
