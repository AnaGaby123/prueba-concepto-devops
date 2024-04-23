import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellBuyLicensesComponent} from '@appComponents/catalogos/providers/providers-details/sections/sell-buy-licenses/sell-buy-licenses.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep6BuySaleAndLicencesEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.effects';

@NgModule({
  declarations: [SellBuyLicensesComponent],
  exports: [SellBuyLicensesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    RadioButtonModule,
    CheckBoxModule,
    DropDownListModule,
    EffectsModule.forFeature([ProviderFormStep6BuySaleAndLicencesEffects]),
  ],
})
export class SellBuyLicensesModule {}
