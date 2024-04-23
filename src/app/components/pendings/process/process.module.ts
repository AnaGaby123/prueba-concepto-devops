import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessComponent} from './process.component';
import {ProcessRoutingModule} from '@appComponents/pendings/process/process-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ProcessComponent],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.process),
    ),
  ],
  exports: [ProcessComponent],
})
export class ProcessModule {}
