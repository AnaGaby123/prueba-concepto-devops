/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Routing Imports */
import {ExecuteCollectionRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-routing.module';

/* Component Imports */
import {ExecuteCollectionComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection.component';

/* Module Imports */
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {ExecuteCollectionCalendarEffect} from '@appEffects/pendings/charges/execute-collection/execute-collection-list/execute-collection-calendar.effect';
import {ExecuteCollectionDetailsEffects} from '@appEffects/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    ExecuteCollectionRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.charges),
    ),
    EffectsModule.forFeature([ExecuteCollectionCalendarEffect, ExecuteCollectionDetailsEffects]),
  ],
  exports: [ExecuteCollectionComponent],
  declarations: [ExecuteCollectionComponent],
})
export class ExecuteCollectionModule {}
