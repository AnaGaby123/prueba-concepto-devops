import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessListComponent} from '@appComponents/pendings/process/process-list/process-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProcessListRoutingModule {}
