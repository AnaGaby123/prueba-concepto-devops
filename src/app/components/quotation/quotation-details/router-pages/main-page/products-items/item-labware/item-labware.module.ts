import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemLabwareComponent} from './item-labware.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DocumentationModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/documentation/documentation.module';

@NgModule({
  declarations: [ItemLabwareComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule, DocumentationModule],
  exports: [ItemLabwareComponent],
})
export class ItemLabwareModule {}
