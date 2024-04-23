import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsSupplementsComponent} from '@appComponents/shared/products-supplements/products-supplements.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProductsSupplementsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ProductsSupplementsComponent],
})
export class ProductsSupplementsModule {}
