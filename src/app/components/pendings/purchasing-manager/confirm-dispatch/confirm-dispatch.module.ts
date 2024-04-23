/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Module Imports */
import {ConfirmDispatchRoutingModule} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-routing.module';

/* Component Imports */
import {ConfirmDispatchComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {ConfirmDispatchDetailsEffects} from '@appEffects/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.effects';
import {ConfirmDispatchListEffects} from '@appEffects/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDispatchRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([ConfirmDispatchListEffects, ConfirmDispatchDetailsEffects]),
    TranslateModule,
  ],
  exports: [ConfirmDispatchComponent],
  declarations: [ConfirmDispatchComponent],
})
export class ConfirmDispatchModule {}
