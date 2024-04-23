import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesConfigurationRoutingModule} from './sales-configuration-routing.module';
import {SalesConfigurationComponent} from '@appComponents/pendings/new-product-existing-supplier/sales-configuration/sales-configuration.component';
import {PqfHeaderModule} from '@appComponents/shared/pqf-header/pqf-header.module';
import {EffectsModule} from '@ngrx/effects';
import {SalesConfigurationEffects} from '@appEffects/pendings/new-product-existing-supplier/sales-configuration/sales-configuration.effects';
import {SalesConfigurationMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [SalesConfigurationComponent],
  imports: [
    CommonModule,
    SalesConfigurationRoutingModule,
    PqfHeaderModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.newProductExistingSupplier),
    ),
    EffectsModule.forFeature([SalesConfigurationEffects, SalesConfigurationMethodsEffects]),
  ],
  exports: [SalesConfigurationComponent],
})
export class SalesConfigurationModule {}
