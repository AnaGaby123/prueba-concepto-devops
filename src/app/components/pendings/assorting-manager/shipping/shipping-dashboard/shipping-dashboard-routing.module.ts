import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingDashboardComponent} from '@appComponents/pendings/assorting-manager/shipping/shipping-dashboard/shipping-dashboard.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: ShippingDashboardComponent}])],
})
export class ShippingDashboardRoutingModule {}
