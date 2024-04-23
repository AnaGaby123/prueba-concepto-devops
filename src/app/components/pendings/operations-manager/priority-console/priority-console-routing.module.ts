import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PriorityConsoleComponent} from '@appComponents/pendings/operations-manager/priority-console/priority-console.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PriorityConsoleComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.priorityConsole.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.priorityConsole.list,
            loadChildren: () =>
              import('./priority-console-list/priority-console-list.module').then(
                (m) => m.PriorityConsoleListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PriorityConsoleRoutingModule {}
