import {NgModule} from '@angular/core';
import {OrderModificationComponent} from '@appComponents/pendings/order-modification/order-modification.component';
import {OrderModificationRoutingModule} from '@appComponents/pendings/order-modification/order-modification-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {OrderModificationListEffects} from '@appEffects/pendings/order-modification/order-modification-list/order-modification-list.effects';
import {OrderModificationDetailsEffect} from '@appEffects/pendings/order-modification/order-modification-details/order-modification-details.effect';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderModificationRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.orderModification),
    ),
    EffectsModule.forFeature([OrderModificationListEffects, OrderModificationDetailsEffect]),
    TranslateModule,
  ],
  exports: [OrderModificationComponent],
  declarations: [OrderModificationComponent],
})
export class OrderModificationModule {}
