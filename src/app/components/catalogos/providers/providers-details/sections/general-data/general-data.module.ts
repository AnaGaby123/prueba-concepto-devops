import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralDataComponent} from '@appComponents/catalogos/providers/providers-details/sections/general-data/general-data.component';
import {ProviderGeneralDataModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-general-data/provider-general-data.module';
import {ProviderAddressModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-address/provider-address.module';
import {ProviderCommercialInfoModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-commercial-info/provider-commercial-info.module';
import {ProviderContactsModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-contacts/provider-contacts.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep1GeneralDataMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-form-step-1-general-data-methods.effects';
import {ProviderFormStep1GeneralDataEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-1-general-data.effects';

@NgModule({
  declarations: [GeneralDataComponent],
  exports: [GeneralDataComponent],
  imports: [
    CommonModule,
    ProviderGeneralDataModule,
    ProviderAddressModule,
    ProviderCommercialInfoModule,
    ProviderContactsModule,
    AlertModule,
    EffectsModule.forFeature([
      ProviderFormStep1GeneralDataMethodsEffects,
      ProviderFormStep1GeneralDataEffects,
    ]),
  ],
})
export class GeneralDataModule {}
