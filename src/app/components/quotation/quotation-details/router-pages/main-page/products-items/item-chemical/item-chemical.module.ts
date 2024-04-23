import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemChemicalComponent} from './item-chemical.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DocumentationModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/documentation/documentation.module';

@NgModule({
  declarations: [ItemChemicalComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule, DocumentationModule],
  exports: [ItemChemicalComponent],
})
export class ItemChemicalModule {}
