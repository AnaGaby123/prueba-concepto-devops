import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WorkArrivalDocumentsComponent} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: WorkArrivalDocumentsComponent,
        children: [
          {
            path: appRoutes.empty,
            pathMatch: 'full',
            redirectTo: appRoutes.workArrivalDocuments.list,
          },
          {
            path: appRoutes.workArrivalDocuments.list,
            loadChildren: () =>
              import('./work-arrival-documents-list/work-arrival-documents-list.module').then(
                (m) => m.WorkArrivalDocumentsListModule,
              ),
          },
          {
            path: appRoutes.workArrivalDocuments.details,
            loadChildren: () =>
              import('./work-arrival-documents-details/work-arrival-documents-details.module').then(
                (m) => m.WorkArrivalDocumentsDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WorkArrivalDocumentsRoutingModule {}
