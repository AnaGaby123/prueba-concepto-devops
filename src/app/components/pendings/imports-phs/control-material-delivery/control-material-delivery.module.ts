import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlMaterialDeliveryComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery.component';
import {FormsModule} from '@angular/forms';
import {ControlMaterialDeliveryRoutingModule} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {ControlMaterialDeliveryListEffects} from '@appEffects/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.effects';
import {ControlMaterialDeliveryDetailsEffects} from '@appEffects/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ControlMaterialDeliveryRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.importsPHS),
    ),
    EffectsModule.forFeature([
      ControlMaterialDeliveryListEffects,
      ControlMaterialDeliveryDetailsEffects,
    ]),
  ],
  exports: [ControlMaterialDeliveryComponent],
  declarations: [ControlMaterialDeliveryComponent],
})
export class ControlMaterialDeliveryModule {}
