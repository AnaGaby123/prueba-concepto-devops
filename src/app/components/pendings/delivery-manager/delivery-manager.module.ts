import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryManagerComponent} from '@appComponents/pendings/delivery-manager/delivery-manager.component';
import {DeliveryManagerRoutingModule} from '@appComponents/pendings/delivery-manager/delivery-manager-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [DeliveryManagerComponent],
  imports: [
    CommonModule,
    DeliveryManagerRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.deliveryManager),
    ),
  ],
  exports: [DeliveryManagerComponent],
})
export class DeliveryManagerModule {}
