import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryBillingComponent} from '@appComponents/catalogos/clients/clients-details/delivery-billing/delivery-billing.component';
import {DeliveryBillingRoutingModule} from './delivery-billing-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {EffectsModule} from '@ngrx/effects';
import {DeliveryBillingClientsFormEffects} from '@appEffects/forms/client-form/clients-details-form/delivery-billing/delivery-billing-clients-form.effects';
import {DeliveryBillingClientsFormMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/delivery-billing/delivery-billing-clients-form-methods.effects';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {AddressDialogModule} from '@appComponents/catalogos/clients/clients-details/address/address-dialog/address-dialog.module';
import {AuthCodeDialogEffects} from '@appEffects/dialogs/auth-code/auth-code-dialog.effects';
import {RequestAuthCodeDialogModule} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.module';
import {ValidateAuthCodeDialogModule} from '@appComponents/shared/validate-auth-code-dialog/validate-auth-code-dialog.module';

@NgModule({
  declarations: [DeliveryBillingComponent],
  imports: [
    CommonModule,
    DeliveryBillingRoutingModule,
    TranslateModule,
    TranslateModule,
    DropDownListModule,
    GenericInputModule,
    RadioButtonModule,
    DatePickerModule,
    DateFormatModule,
    CheckBoxModule,
    DateRangeModule,
    EffectsModule.forFeature([
      DeliveryBillingClientsFormEffects,
      DeliveryBillingClientsFormMethodsEffects,
      AuthCodeDialogEffects,
    ]),
    SearchModule,
    AddressDialogModule,
    RequestAuthCodeDialogModule,
    ValidateAuthCodeDialogModule,
  ],
  exports: [DeliveryBillingComponent],
})
export class DeliveryBillingModule {}
