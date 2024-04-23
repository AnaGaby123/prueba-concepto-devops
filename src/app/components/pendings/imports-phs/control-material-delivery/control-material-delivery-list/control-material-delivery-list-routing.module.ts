import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlMaterialDeliveryListComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ControlMaterialDeliveryListComponent}])],
  exports: [RouterModule],
})
export class ControlMaterialDeliveryListRoutingModule {}
