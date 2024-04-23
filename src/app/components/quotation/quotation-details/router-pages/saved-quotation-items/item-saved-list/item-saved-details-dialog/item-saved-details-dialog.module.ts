import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemSavedDetailsDialogComponent} from './item-saved-details-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopItemsProductsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/pop-items-products/pop-items-products.module';

@NgModule({
  declarations: [ItemSavedDetailsDialogComponent],
  imports: [CommonModule, PopUpGenericModule, PopItemsProductsModule],
})
export class ItemSavedDetailsDialogModule {}
