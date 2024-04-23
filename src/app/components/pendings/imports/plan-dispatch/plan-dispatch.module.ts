/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {PlanDispatchComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch.component';

/* Module Imports */
import {PlanDispatchRoutingModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {PlanDispatchListEffects} from '@appEffects/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.effects';
import {PlanDispatchDetailsEffects} from '@appEffects/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    PlanDispatchRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.imports),
    ),
    EffectsModule.forFeature([PlanDispatchListEffects, PlanDispatchDetailsEffects]),
    TranslateModule,
  ],
  exports: [PlanDispatchComponent],
  declarations: [PlanDispatchComponent],
})
export class PlanDispatchModule {}
