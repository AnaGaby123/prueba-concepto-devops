import {NgModule} from '@angular/core';
import {InspectorDetailsComponent} from './inspector-details.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InspectorDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.inspector.steps,
            pathMatch: 'full',
          },
          {
            path: appRoutes.inspector.steps,
            loadChildren: () => import('./steps/steps.module').then((m) => m.StepsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InspectorDetailsRoutingModule {}
