import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchasingConfigurationRoutingModule} from './purchasing-configuration-routing.module';
import {PurchasingConfigurationComponent} from './purchasing-configuration.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {PqfHeaderModule} from '@appComponents/shared/pqf-header/pqf-header.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [PurchasingConfigurationComponent],
  imports: [
    CommonModule,
    PurchasingConfigurationRoutingModule,
    HeaderBarModule,
    PqfHeaderModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.newProductExistingSupplier),
    ),
  ],
})
export class PurchasingConfigurationModule {}
