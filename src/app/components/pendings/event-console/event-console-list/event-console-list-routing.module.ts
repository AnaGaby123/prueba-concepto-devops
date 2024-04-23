import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventConsoleListComponent} from '@appComponents/pendings/event-console/event-console-list/event-console-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: EventConsoleListComponent}])],
  exports: [RouterModule],
})
export class EventConsoleListRoutingModule {}
