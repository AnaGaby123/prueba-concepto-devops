import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {ProductItemComponent} from '@appComponents/shared/product-item/product-item.component';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, CheckBoxModule],
  exports: [ProductItemComponent],
})
export class ProductItemModule {}
