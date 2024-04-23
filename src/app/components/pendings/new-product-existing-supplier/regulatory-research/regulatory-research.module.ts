import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulatoryResearchComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.component';
import {RegulatoryResearchRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-routing.module';
import {PqfHeaderModule} from '@appComponents/shared/pqf-header/pqf-header.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [RegulatoryResearchComponent],
  imports: [
    CommonModule,
    RegulatoryResearchRoutingModule,
    HeaderBarModule,
    PqfHeaderModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.newProductExistingSupplier),
    ),
  ],
  exports: [RegulatoryResearchComponent],
})
export class RegulatoryResearchModule {}
