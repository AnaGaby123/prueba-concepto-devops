import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductToClaimComponent} from './product-to-claim.component';
import {ProductToClaimRoutingModule} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ProductToClaimComponent],
  imports: [
    CommonModule,
    ProductToClaimRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.productToClaim),
    ),
  ],
  exports: [ProductToClaimComponent],
})
export class ProductToClaimModule {}
