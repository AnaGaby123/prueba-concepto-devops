import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PreprocessOrderDetailComponent} from '@appComponents/pre-processing/preprocess-order-detail/preprocess-order-detail.component';
import {PreProcessDetailsGuardService} from '@appGuards/pre-process/pre-process-details-guard.service';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PreprocessOrderDetailComponent,
        canActivate: [PreProcessDetailsGuardService],
        children: [
          {
            path: '',
            redirectTo: appRoutes.preProcessing.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.preProcessing.details,
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PreprocessOrderDetailRoutingModule {}
