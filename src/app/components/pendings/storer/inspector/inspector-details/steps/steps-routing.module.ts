import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StepsComponent} from '@appComponents/pendings/storer/inspector/inspector-details/steps/steps.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.inspector.step0,
            pathMatch: 'full',
          },
          {
            path: appRoutes.inspector.step0,
            loadChildren: () => import('./step0/step0.module').then((m) => m.Step0Module),
          },
          {
            path: appRoutes.inspector.step1,
            loadChildren: () => import('./step1/step1.module').then((m) => m.Step1Module),
          },
          {
            path: appRoutes.inspector.step2,
            loadChildren: () => import('./step2/step2.module').then((m) => m.Step2Module),
          },
          {
            path: appRoutes.inspector.step3,
            loadChildren: () => import('./step3/step3.module').then((m) => m.Step3Module),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StepsRoutingModule {}
