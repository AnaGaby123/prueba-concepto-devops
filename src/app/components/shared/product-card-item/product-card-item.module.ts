import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardItemComponent} from '@appComponents/shared/product-card-item/product-card-item.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  declarations: [ProductCardItemComponent],
  imports: [CommonModule, CheckBoxModule],
  exports: [ProductCardItemComponent],
})
export class ProductCardItemModule {}
