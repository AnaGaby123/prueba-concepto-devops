import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlSupplierClaimRoutingModule} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-routing.module';
import {ControlSupplierClaimComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ControlSupplierClaimComponent],
  imports: [
    CommonModule,
    ControlSupplierClaimRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.productToClaim),
    ),
  ],
  exports: [ControlSupplierClaimComponent],
})
export class ControlSupplierClaimModule {}
