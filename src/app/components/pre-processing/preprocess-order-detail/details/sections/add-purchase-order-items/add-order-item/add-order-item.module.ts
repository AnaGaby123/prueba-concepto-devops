import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {FormsModule} from '@angular/forms';
import {AddOrderItemComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/add-purchase-order-items/add-order-item/add-order-item.component';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CustomPositionPopUpModule,
    DateFormatModule,
    TranslateModule,
    DateFormatModule,
    CustomPositionPopUpModule,
    CheckBoxModule,
    GenericInputModule,
    FormsModule,
    InternalSalesItemModule,
  ],
  exports: [AddOrderItemComponent],
  declarations: [AddOrderItemComponent],
})
export class AddOrderItemModule {}
