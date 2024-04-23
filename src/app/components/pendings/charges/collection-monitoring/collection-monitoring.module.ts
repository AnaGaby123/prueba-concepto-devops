import {NgModule} from '@angular/core';
import {CollectionMonitoringComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollectionMonitoringRoutingModule} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {CollectionMonitoringListEffects} from '@appEffects/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.effects';
import {CollectionMonitoringDetailsEffects} from '@appEffects/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionMonitoringRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.charges),
    ),
    EffectsModule.forFeature([CollectionMonitoringListEffects, CollectionMonitoringDetailsEffects]),
  ],
  exports: [CollectionMonitoringComponent],
  declarations: [CollectionMonitoringComponent],
})
export class CollectionMonitoringModule {}
