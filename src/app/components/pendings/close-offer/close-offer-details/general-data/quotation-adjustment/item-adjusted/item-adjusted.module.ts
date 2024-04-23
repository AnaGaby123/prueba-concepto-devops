import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemAdjustedComponent} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-adjustment/item-adjusted/item-adjusted.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ItemAdjustedComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ItemAdjustedComponent],
})
export class ItemAdjustedModule {}
