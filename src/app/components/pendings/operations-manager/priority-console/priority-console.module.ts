import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PriorityConsoleComponent} from '@appComponents/pendings/operations-manager/priority-console/priority-console.component';
import {PriorityConsoleRoutingModule} from '@appComponents/pendings/operations-manager/priority-console/priority-console-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [PriorityConsoleComponent],
  imports: [
    CommonModule,
    PriorityConsoleRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.operationsManager),
    ),
  ],
  exports: [PriorityConsoleComponent],
})
export class PriorityConsoleModule {}
