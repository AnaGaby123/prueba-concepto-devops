import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EventConsoleComponent} from '@appComponents/pendings/event-console/event-console.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EventConsoleRoutingModule} from '@appComponents/pendings/event-console/event-console-routing.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventConsoleRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.eventConsole),
    ),
  ],
  exports: [EventConsoleComponent],
  declarations: [EventConsoleComponent],
})
export class EventConsoleModule {}
