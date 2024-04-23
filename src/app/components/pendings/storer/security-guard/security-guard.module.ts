import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityGuardComponent} from './security-guard.component';
import {SecurityGuardRoutingModule} from '@appComponents/pendings/storer/security-guard/security-guard-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {SecurityGuardDetailsEffects} from '@appEffects/pendings/security-guard/security-guard-details/security-guard-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [SecurityGuardComponent],
  imports: [
    CommonModule,
    SecurityGuardRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.securityGuard),
    ),
    EffectsModule.forFeature([SecurityGuardDetailsEffects]),
  ],
  exports: [SecurityGuardComponent],
})
export class SecurityGuardModule {}
