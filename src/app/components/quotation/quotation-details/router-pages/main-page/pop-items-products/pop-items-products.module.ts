import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopItemsProductsComponent} from './pop-items-products.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ProductItemModule} from '@appComponents/shared/product-item/product-item.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DocumentationModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/documentation/documentation.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';

@NgModule({
  declarations: [PopItemsProductsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DateFormatModule,
    TabsModule,
    ProductItemModule,
    GenericInputModule,
    WithoutResultsModule,
    DatePickerModule,
    DocumentationModule,
    GenericTextAreaModule,
    ProductCardItemModule,
  ],
  exports: [PopItemsProductsComponent],
})
export class PopItemsProductsModule {}
