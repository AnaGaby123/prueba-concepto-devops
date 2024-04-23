import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventConsoleComponent} from '@appComponents/pendings/event-console/event-console.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EventConsoleComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.eventConsole.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.eventConsole.list,
            loadChildren: () =>
              import('./event-console-list/event-console-list.module').then(
                (m) => m.EventConsoleListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class EventConsoleRoutingModule {}
