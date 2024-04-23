import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractsDetailsComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/contracts-details.component';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {ClientContractBrandsModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-brands/client-contract-brands.module';
import {ClientContractFamiliesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/client-contract-families.module';
import {ClientContractContractModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-contract/client-contract-contract.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {ClientContractFormDetailsMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-form-methods/client-contract-form-details-methods.effects';
import {ClientContractConfigurationsLevelsSavesEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-configurations-levels-saves.effects';
import {ClientContractsSavesFormEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-saves.effects';
import {ClientContractFormContractBrandsMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-form-methods/client-contract-form-contract-brands-methods.effects';
import {ClientContractFormListMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-form-methods/client-contract-form-list-methods.effects';
import {ClientContractFormContractFamiliesMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-form-methods/client-contract-form-contract-families-methods.effects';
import {ClientContractFormContractMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-form-methods/client-contract-form-contract-methods.effects';

@NgModule({
  declarations: [ContractsDetailsComponent],
  imports: [
    CommonModule,
    BarActivitiesModule,
    ClientContractBrandsModule,
    ClientContractFamiliesModule,
    ClientContractContractModule,
    PopUpGenericModule,
    TranslateModule,
    EffectsModule.forFeature([
      ClientContractConfigurationsLevelsSavesEffects,
      ClientContractsSavesFormEffects,
      ClientContractFormContractBrandsMethodsEffects,
      ClientContractFormListMethodsEffects,
      ClientContractFormDetailsMethodsEffects,
      ClientContractFormContractFamiliesMethodsEffects,
      ClientContractFormContractMethodsEffects,
    ]),
  ],
  exports: [ContractsDetailsComponent],
})
export class ContractsDetailsModule {}
