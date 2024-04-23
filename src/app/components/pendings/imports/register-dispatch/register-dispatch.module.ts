/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {RegisterDispatchComponent} from '@appComponents/pendings/imports/register-dispatch/register-dispatch.component';

/* Module Imports */
import {RegisterDispatchRoutingModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {RegisterDispatchDetailsEffects} from '@appEffects/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.effects';
import {RegisterDispatchListEffects} from '@appEffects/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    RegisterDispatchRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.imports),
    ),
    EffectsModule.forFeature([RegisterDispatchListEffects, RegisterDispatchDetailsEffects]),
    TranslateModule,
  ],
  exports: [RegisterDispatchComponent],
  declarations: [RegisterDispatchComponent],
})
export class RegisterDispatchModule {}
