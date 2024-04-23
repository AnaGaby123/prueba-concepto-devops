import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyComponent} from '@appComponents/pendings/strategy/strategy.component';
import {StrategyRoutingModule} from '@appComponents/pendings/strategy/strategy-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {StrategyDashboardEffects} from '@appEffects/pendings/strategy/strategy-dashboard/strategy-dashboard.effects';
import {StrategyDetailsEffects} from '@appEffects/pendings/strategy/strategy-details/strategy-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {StrategyDetailsMethodsEffects} from '@appEffects/pendings/strategy/strategy-details/strategy-details-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [StrategyComponent],
  imports: [
    CommonModule,
    StrategyRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.strategy),
    ),
    EffectsModule.forFeature([
      StrategyDashboardEffects,
      StrategyDetailsEffects,
      StrategyDetailsMethodsEffects,
    ]),
    TranslateModule,
  ],
  exports: [StrategyComponent],
})
export class StrategyModule {}
