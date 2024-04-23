import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/offer.component';
import {TranslateModule} from '@ngx-translate/core';
import {CardModule} from '@appComponents/shared/card/card.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {GeneralsModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/generals/generals.module';
import {ListPriceModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/list-price/list-price.module';
import {OfferCharacteristicGrouperModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/offer-classification/offer-characteristic-grouper.module';
import {ProductModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/product/product.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {EffectsModule} from '@ngrx/effects';
import {OfferEffects} from '@appEffects/forms/providers/providers-details/offer/offer.effects';
import {OfferSavesEffects} from '@appEffects/forms/providers/providers-details/offer/offer-saves.effects';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [OfferComponent],
  exports: [OfferComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    TabsModule,
    WithoutResultsModule,
    GeneralsModule,
    ListPriceModule,
    OfferCharacteristicGrouperModule,
    ProductModule,
    GenericInputModule,
    RadioButtonModule,
    ToggleSwitchModule,
    CheckBoxModule,
    EffectsModule.forFeature([OfferEffects, OfferSavesEffects]),
    PqfCardModule,
    ConfirmDialogModule,
  ],
})
export class OfferModule {}
