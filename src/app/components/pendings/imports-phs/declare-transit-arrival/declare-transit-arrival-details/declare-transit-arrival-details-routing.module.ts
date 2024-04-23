import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareTransitArrivalDetailsComponent} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: DeclareTransitArrivalDetailsComponent}])],
  exports: [RouterModule],
})
export class DeclareTransitArrivalDetailsRoutingModule {}
