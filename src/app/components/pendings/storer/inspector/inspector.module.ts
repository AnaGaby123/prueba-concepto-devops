import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InspectorComponent} from './inspector.component';
import {InspectorRoutingModule} from '@appComponents/pendings/storer/inspector/inspector-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [InspectorComponent],
  imports: [
    CommonModule,
    InspectorRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.storer),
    ),
  ],
  exports: [InspectorComponent],
})
export class InspectorModule {}
