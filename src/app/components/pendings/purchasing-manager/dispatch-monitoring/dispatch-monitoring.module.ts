import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DispatchMonitoringRoutingModule} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-routing.module';
import {DispatchMonitoringComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {DispatchMonitoringDetailsEffects} from '@appEffects/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.effects';
import {DispatchMonitoringListEffects} from '@appEffects/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    DispatchMonitoringRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([DispatchMonitoringListEffects, DispatchMonitoringDetailsEffects]),
    TranslateModule,
  ],
  declarations: [DispatchMonitoringComponent],
  exports: [DispatchMonitoringComponent],
})
export class DispatchMonitoringModule {}
