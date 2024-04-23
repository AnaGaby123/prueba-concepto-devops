import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GuideClientComponent} from '@appComponents/pendings/guide-client/guide-client/guide-client.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GuideClientComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.guideClient.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.guideClient.list,
            loadChildren: () =>
              import('./guide-client-list/guide-client-list.module').then(
                (m) => m.GuideClientListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GuideClientRoutingModule {}
