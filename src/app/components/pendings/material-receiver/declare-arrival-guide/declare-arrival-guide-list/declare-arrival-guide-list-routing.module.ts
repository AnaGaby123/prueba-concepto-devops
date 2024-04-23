import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareArrivalGuideListComponent} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide-list/declare-arrival-guide-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: DeclareArrivalGuideListComponent}])],
  exports: [RouterModule],
})
export class DeclareArrivalGuideListRoutingModule {}
