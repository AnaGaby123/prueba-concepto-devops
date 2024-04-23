import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WorkArrivalDocumentsListComponent} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path: appRoutes.empty, component: WorkArrivalDocumentsListComponent}]),
  ],
  exports: [RouterModule],
})
export class WorkArrivalDocumentsListRoutingModule {}
