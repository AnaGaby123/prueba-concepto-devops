import {NgModule} from '@angular/core';
import {ProvidersDetailsComponent} from '@appComponents/catalogos/providers/providers-details/providers-details.component';
import {ProvidersDetailsRoutingModule} from '@appComponents/catalogos/providers/providers-details/providers-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {GeneralDataModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/general-data.module';
import {CampaingModule} from '@appComponents/catalogos/providers/providers-details/sections/campaing/campaing.module';
import {ClassificationModule} from '@appComponents/catalogos/providers/providers-details/sections/classification/classification.module';
import {LogisticsPaymentsModule} from '@appComponents/catalogos/providers/providers-details/sections/logistics-payments/logistics-payments.module';
import {SellBuyLicensesModule} from '@appComponents/catalogos/providers/providers-details/sections/sell-buy-licenses/sell-buy-licenses.module';
import {TrademarkOfferModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/trademark-offer.module';
import {EffectsModule} from '@ngrx/effects';
import {ProvidersDetailsEffects} from '@appEffects/forms/providers/providers-details/providers-details.effects';
import {ProviderDetailsMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-details-methods.effects';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [
    ProvidersDetailsRoutingModule,
    TranslateModule,
    CommonModule,
    TabsModule,
    GeneralDataModule,
    CampaingModule,
    ClassificationModule,
    LogisticsPaymentsModule,
    SellBuyLicensesModule,
    TrademarkOfferModule,
    EffectsModule.forFeature([ProviderDetailsMethodsEffects, ProvidersDetailsEffects]),
    ConfirmDialogModule,
  ],
  exports: [ProvidersDetailsComponent],
  declarations: [ProvidersDetailsComponent],
  providers: [],
})
export class ProvidersDetailsModule {}
