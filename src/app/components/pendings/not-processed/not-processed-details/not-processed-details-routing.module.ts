import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotProcessedDetailsComponent} from '@appComponents/pendings/not-processed/not-processed-details/not-processed-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotProcessedDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NotProcessedDetailsRoutingModule {}
