import {NgModule} from '@angular/core';
import {RegisterArrivalComponent} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterArrivalRoutingModule} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {RegisterArrivalDetailsEffects} from '@appEffects/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.effects';
import {RegisterArrivalListEffects} from '@appEffects/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegisterArrivalRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([RegisterArrivalListEffects, RegisterArrivalDetailsEffects]),
  ],
  exports: [RegisterArrivalComponent],
  declarations: [RegisterArrivalComponent],
})
export class RegisterArrivalModule {}
