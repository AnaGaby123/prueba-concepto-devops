import {NgModule} from '@angular/core';
import {DeclareTransitArrivalComponent} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareTransitArrivalRoutingModule} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {DeclareTransitArrivalListEffects} from '@appEffects/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.effects';
import {DeclareTransitArrivalDetailsEffects} from '@appEffects/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderBarModule,
    DeclareTransitArrivalRoutingModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.importsPHS),
    ),
    EffectsModule.forFeature([
      DeclareTransitArrivalListEffects,
      DeclareTransitArrivalDetailsEffects,
    ]),
  ],

  exports: [DeclareTransitArrivalComponent],
  declarations: [DeclareTransitArrivalComponent],
})
export class DeclareTransitArrivalModule {}
