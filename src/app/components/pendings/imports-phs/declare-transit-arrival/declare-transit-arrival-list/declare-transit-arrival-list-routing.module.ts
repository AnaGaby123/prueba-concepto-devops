import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareTransitArrivalListComponent} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: DeclareTransitArrivalListComponent}])],
  exports: [RouterModule],
})
export class DeclareTransitArrivalListRoutingModule {}
