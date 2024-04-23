import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderInternalSalesItemComponent} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  declarations: [HeaderInternalSalesItemComponent],
  imports: [CommonModule, TranslateModule, InternalSalesItemModule],
  exports: [HeaderInternalSalesItemComponent],
})
export class HeaderInternalSalesItemModule {}
