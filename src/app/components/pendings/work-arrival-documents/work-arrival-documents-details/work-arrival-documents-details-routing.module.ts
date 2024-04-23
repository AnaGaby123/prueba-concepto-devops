import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WorkArrivalDocumentsDetailsComponent} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: appRoutes.empty, component: WorkArrivalDocumentsDetailsComponent},
    ]),
  ],
  exports: [RouterModule],
})
export class WorkArrivalDocumentsDetailsRoutingModule {}
