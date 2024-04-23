import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareArrivalListComponent} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: DeclareArrivalListComponent}])],
  exports: [RouterModule],
})
export class DeclareArrivalListRoutingModule {}
