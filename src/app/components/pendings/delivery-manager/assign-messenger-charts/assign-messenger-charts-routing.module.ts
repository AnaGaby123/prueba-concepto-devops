import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AssignMessengerChartsComponent} from '@appComponents/pendings/delivery-manager/assign-messenger-charts/assign-messenger-charts.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AssignMessengerChartsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AssignMessengerChartsRoutingModule {}
