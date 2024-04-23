import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {PaymentDatePopComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-details/payment-date-pop/payment-date-pop.component';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [PaymentDatePopComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    TranslateModule,
    PopUpGenericModule,
    GenericTextAreaModule,
  ],
  exports: [PaymentDatePopComponent],
})
export class PaymentDatePopModule {}
