import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemBiologicComponent} from './item-biologic.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DocumentationModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/documentation/documentation.module';

@NgModule({
  declarations: [ItemBiologicComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule, DocumentationModule],
  exports: [ItemBiologicComponent],
})
export class ItemBiologicModule {}
