import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendInvestigationListComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-list/attend-investigation-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: AttendInvestigationListComponent}])],
  exports: [RouterModule],
})
export class AttendInvestigationListRoutingModule {}
