import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessDetailsComponent} from '@appComponents/pendings/process/process-details/process-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProcessDetailsRoutingModule {}
