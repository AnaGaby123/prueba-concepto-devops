import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecureShipmentRoutingModule} from './secure-shipment-routing.module';
import {SecureShipmentComponent} from '@purchasing-manager/secure-shipment/secure-shipment.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [SecureShipmentComponent],
  imports: [
    CommonModule,
    SecureShipmentRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
  ],
  exports: [SecureShipmentComponent],
})
export class SecureShipmentModule {}
