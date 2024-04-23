import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationComponent} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.component';
import {LogisticConfigurationRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-routing.module';
import {PqfHeaderModule} from '@appComponents/shared/pqf-header/pqf-header.module';
import {LogisticConfigurationDetailsEffects} from '@appEffects/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-details/logistic-configuration-details.effects';
import {EffectsModule} from '@ngrx/effects';
import {LogisticConfigurationDetailsMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-details/logistic-configuration-details-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [LogisticConfigurationComponent],
  imports: [
    CommonModule,
    LogisticConfigurationRoutingModule,
    PqfHeaderModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.newProductExistingSupplier),
    ),
    EffectsModule.forFeature([
      LogisticConfigurationDetailsEffects,
      LogisticConfigurationDetailsMethodsEffects,
    ]),
  ],
  exports: [LogisticConfigurationComponent],
})
export class LogisticConfigurationModule {}
