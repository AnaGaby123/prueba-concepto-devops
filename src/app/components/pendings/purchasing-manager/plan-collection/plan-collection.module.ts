import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {PlanCollectionComponent} from '@purchasing-manager/plan-collection/plan-collection.component';
import {PlanCollectionEffects} from '@appEffects/pendings/purchasing-manager/plan-collection/plan-collection-order.effects';
import {PlanCollectionRoutingModule} from './plan-collection-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([PlanCollectionEffects]),
    HeaderBarModule,
    PlanCollectionRoutingModule,
    TranslateModule,
  ],
  exports: [PlanCollectionComponent],
  declarations: [PlanCollectionComponent],
})
export class PlanCollectionModule {}
