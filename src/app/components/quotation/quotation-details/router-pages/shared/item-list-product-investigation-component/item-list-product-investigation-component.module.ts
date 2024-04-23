import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemListProductInvestigationComponentComponent} from '@appComponents/quotation/quotation-details/router-pages/shared/item-list-product-investigation-component/item-list-product-investigation-component.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ItemListProductInvestigationComponentComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule],
  exports: [ItemListProductInvestigationComponentComponent],
})
export class ItemListProductInvestigationComponentModule {}
