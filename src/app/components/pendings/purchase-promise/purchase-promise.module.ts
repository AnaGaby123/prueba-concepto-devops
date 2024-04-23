import {NgModule} from '@angular/core';
import {PurchasePromiseComponent} from '@appComponents/pendings/purchase-promise/purchase-promise.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PurchasePromiseRoutingModule} from '@appComponents/pendings/purchase-promise/purchase-promise-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {PurchasePromiseListEffects} from '@appEffects/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [PurchasePromiseComponent],
  imports: [
    CommonModule,
    FormsModule,
    PurchasePromiseRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasePromise),
    ),
    EffectsModule.forFeature([PurchasePromiseListEffects]),
  ],
  exports: [PurchasePromiseComponent],
})
export class PurchasePromiseModule {}
