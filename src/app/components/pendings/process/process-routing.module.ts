import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessComponent} from '@appComponents/pendings/process/process.component';
import {ProcessDetailsGuard} from '@appGuards/pendings/process/process-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.process.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.process.list,
            loadChildren: () =>
              import('./process-list/process-list.module').then((m) => m.ProcessListModule),
          },
          {
            path: appRoutes.process.details,
            loadChildren: () =>
              import('./process-details/process-details.module').then(
                (m) => m.ProcessDetailsModule,
              ),
            canLoad: [ProcessDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProcessRoutingModule {}
