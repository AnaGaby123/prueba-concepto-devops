import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotProcessedDashboardComponent} from '@appComponents/pendings/not-processed/not-processed-dashboard/not-processed-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotProcessedDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NotProcessedDashboardRoutingModule {}
