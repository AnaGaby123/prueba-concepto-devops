import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentOrderListComponent} from '@appComponents/pendings/payment-manager/payment-order/payment-order-list/payment-order-list.component';
import {PaymentOrderListRoutingModule} from '@appComponents/pendings/payment-manager/payment-order/payment-order-list/payment-order-list-routing.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [PaymentOrderListComponent],
  imports: [
    CommonModule,
    PaymentOrderListRoutingModule,
    CheckBoxModule,
    ChipModule,
    TranslateModule,
    GenericTextAreaModule,
    GenericInputModule,
  ],
  exports: [PaymentOrderListComponent],
})
export class PaymentOrderListModule {}
