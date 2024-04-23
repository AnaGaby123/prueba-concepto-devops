import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CampaingComponent} from '@appComponents/catalogos/providers/providers-details/sections/campaing/campaing.component';
import {AddCampaingModule} from '@appComponents/catalogos/providers/providers-details/sections/campaing/add-campaing/add-campaing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {SeeCampaignsModule} from '@appComponents/catalogos/providers/providers-details/sections/campaing/see-campaigns/see-campaigns.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep3CampaignMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-form-step-3-campaign-methods.effects';
import {ProviderFormStep3CampaignEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-3-campaign.effects';

@NgModule({
  declarations: [CampaingComponent],
  exports: [CampaingComponent],
  imports: [
    CommonModule,
    AddCampaingModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    WithoutResultsModule,
    LoadingModule,
    SeeCampaignsModule,
    EffectsModule.forFeature([
      ProviderFormStep3CampaignMethodsEffects,
      ProviderFormStep3CampaignEffects,
    ]),
  ],
})
export class CampaingModule {}
