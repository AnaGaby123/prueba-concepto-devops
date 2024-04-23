import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticsPaymentsComponent} from '@appComponents/catalogos/providers/providers-details/sections/logistics-payments/logistics-payments.component';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep5LogisticsAndPaymentsEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.effects';
import {ProviderFormStep5LogisticsAndPaymentsMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-form-step-5-logistics-and-payments-methods.effects';

@NgModule({
  declarations: [LogisticsPaymentsComponent],
  exports: [LogisticsPaymentsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CheckBoxModule,
    GenericInputModule,
    DropDownListModule,
    EffectsModule.forFeature([
      ProviderFormStep5LogisticsAndPaymentsEffects,
      ProviderFormStep5LogisticsAndPaymentsMethodsEffects,
    ]),
  ],
})
export class LogisticsPaymentsModule {}
