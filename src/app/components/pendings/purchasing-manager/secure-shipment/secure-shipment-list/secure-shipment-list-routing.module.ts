import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SecureShipmentListComponent} from '@purchasing-manager/secure-shipment/secure-shipment-list/secure-shipment-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: SecureShipmentListComponent}])],
  exports: [RouterModule],
})
export class SecureShipmentListRoutingModule {}
