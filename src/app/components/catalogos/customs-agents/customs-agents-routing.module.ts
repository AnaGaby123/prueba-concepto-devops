import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomsAgentsComponent} from '@appComponents/catalogos/customs-agents/customs-agents.component';
import {CustomsAgentsGuardService} from '@appGuards/forms/customs-agents-form/customs-agents-guard.service';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CustomsAgentsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.catalogs.customsAgents.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.customsAgents.list,
            loadChildren: () =>
              import('./customs-agents-list/customs-agents-list.module').then(
                (m) => m.CustomsAgentsListModule,
              ),
          },
          {
            path: appRoutes.catalogs.customsAgents.details,
            loadChildren: () =>
              import('./customs-agents-details/customs-agents-details.module').then(
                (m) => m.CustomsAgentsDetailsModule,
              ),
            canLoad: [CustomsAgentsGuardService],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CustomsAgentsRoutingModule {}
