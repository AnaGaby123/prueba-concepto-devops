import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingDetailsComponent} from '@appComponents/pendings/assorting-manager/shipping/shipping-details/shipping-details.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: ShippingDetailsComponent}])],
  exports: [RouterModule],
})
export class ShippingDetailsRoutingModule {}
