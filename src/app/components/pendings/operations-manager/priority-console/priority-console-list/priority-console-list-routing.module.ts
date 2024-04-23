/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {PriorityConsoleListComponent} from '@appComponents/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: PriorityConsoleListComponent}])],
  exports: [RouterModule],
})
export class PriorityConsoleListRoutingModule {}
