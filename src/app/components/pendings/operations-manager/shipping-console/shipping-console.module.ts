import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingConsoleComponent} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console.component';
import {ShippingConsoleRoutingModule} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ShippingConsoleComponent],
  imports: [
    CommonModule,
    ShippingConsoleRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.operationsManager),
    ),
  ],
  exports: [ShippingConsoleComponent],
})
export class ShippingConsoleModule {}
