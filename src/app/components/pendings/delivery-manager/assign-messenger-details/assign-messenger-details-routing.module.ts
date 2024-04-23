import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AssignMessengerDetailsComponent} from '@appComponents/pendings/delivery-manager/assign-messenger-details/assign-messenger-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AssignMessengerDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AssignMessengerDetailsRoutingModule {}
