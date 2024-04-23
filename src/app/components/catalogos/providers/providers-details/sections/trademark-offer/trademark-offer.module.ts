import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrademarkOfferComponent} from './trademark-offer.component';
import {TrademarkModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/trademark/trademark.module';
import {OfferModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/offer.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep4TrademarkMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-form-step-4-trademark-methods.effects';
import {ProviderFormStep4TrademarkEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-4-trademark.effects';

@NgModule({
  declarations: [TrademarkOfferComponent],
  exports: [TrademarkOfferComponent],
  imports: [
    CommonModule,
    TrademarkModule,
    OfferModule,
    OptionsBarModule,
    PopUpGenericModule,
    TranslateModule,
    EffectsModule.forFeature([
      ProviderFormStep4TrademarkMethodsEffects,
      ProviderFormStep4TrademarkEffects,
    ]),
  ],
})
export class TrademarkOfferModule {}
