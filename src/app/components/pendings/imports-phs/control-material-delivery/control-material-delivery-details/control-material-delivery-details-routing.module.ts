import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {ControlMaterialDeliveryDetailsComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ControlMaterialDeliveryDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ControlMaterialDeliveryDetailsRoutingModule {}
